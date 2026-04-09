import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// POST /api/banking/import — import transactions and match payments
export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const body = await req.json();

    const { connection_id, date_from, date_to, force_sync = false } = body;

    if (!connection_id) {
      return json({ ok: false, error: "ID da ligação bancária é obrigatório" }, 400);
    }

    // Verify connection ownership and status
    const [connection] = await sql`
      SELECT
        id,
        bank_name,
        account_iban,
        connection_status,
        api_credentials,
        last_sync
      FROM banking_connections
      WHERE id = ${connection_id} AND user_id = ${user.userId}
    `;

    if (!connection) {
      return json({ ok: false, error: "Ligação bancária não encontrada" }, 404);
    }

    if (connection.connection_status !== 'active' && !force_sync) {
      return json({ ok: false, error: "Ligação bancária não está ativa" }, 400);
    }

    // Set default date range (last 30 days)
    const fromDate = date_from || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const toDate = date_to || new Date().toISOString().split('T')[0];

    // Simulate fetching transactions from banking API
    // In production, this would call actual Open Banking API
    const transactions = await fetchBankTransactions(connection, fromDate, toDate);

    if (!transactions.length) {
      return json({
        ok: true,
        data: {
          transactions_imported: 0,
          payments_matched: 0,
          payments_created: 0,
          message: "Nenhuma transação encontrada no período especificado"
        }
      });
    }

    // Get expected rental payments to match against
    const expectedPayments = await sql`
      SELECT
        rp.id,
        rp.tenant_id,
        rp.amount,
        rp.due_date,
        rp.status,
        t.name as tenant_name,
        t.tax_number as tenant_nif,
        p.id as property_id,
        p.address as property_address
      FROM rental_payments rp
      JOIN tenants t ON t.id = rp.tenant_id
      JOIN properties p ON p.id = t.property_id
      WHERE p.owner_id = ${user.userId}
        AND rp.status IN ('pending', 'overdue')
        AND rp.due_date BETWEEN ${fromDate} AND ${toDate}
      ORDER BY rp.due_date ASC
    `;

    let paymentsMatched = 0;
    let paymentsCreated = 0;
    const matchedTransactions = [];

    for (const transaction of transactions) {
      // Try to match transaction with expected payment
      const match = findPaymentMatch(transaction, expectedPayments);

      if (match) {
        // Update existing payment record
        await sql`
          UPDATE rental_payments
          SET
            status = 'paid',
            paid_date = ${transaction.booking_date},
            payment_method = 'transfer',
            bank_transaction_id = ${transaction.id},
            notes = COALESCE(notes, '') || ${`\nImportado automaticamente: ${transaction.reference || transaction.description}`}
          WHERE id = ${match.id}
        `;

        matchedTransactions.push({
          transaction,
          matched_payment: match,
          action: 'matched'
        });
        paymentsMatched++;
      } else {
        // Check if this looks like a rental payment (amount patterns, descriptions)
        if (isPotentialRentalPayment(transaction)) {
          // Create suggested payment record
          const [suggestedPayment] = await sql`
            INSERT INTO rental_payments (
              tenant_id,
              amount,
              due_date,
              paid_date,
              payment_method,
              status,
              bank_transaction_id,
              notes
            )
            VALUES (
              NULL,
              ${Math.abs(transaction.amount)},
              ${transaction.booking_date},
              ${transaction.booking_date},
              'transfer',
              'unmatched',
              ${transaction.id},
              ${`Importação automática - requer verificação. Ref: ${transaction.reference || 'N/A'}`}
            )
            RETURNING id
          `;

          matchedTransactions.push({
            transaction,
            suggested_payment_id: suggestedPayment.id,
            action: 'suggested'
          });
          paymentsCreated++;
        }
      }
    }

    // Update connection last sync time
    await sql`
      UPDATE banking_connections
      SET last_sync = NOW()
      WHERE id = ${connection_id}
    `;

    return json({
      ok: true,
      data: {
        transactions_imported: transactions.length,
        payments_matched: paymentsMatched,
        payments_created: paymentsCreated,
        matched_transactions: matchedTransactions,
        message: `Importação concluída: ${paymentsMatched} pagamentos confirmados, ${paymentsCreated} transações para revisão`
      }
    });

  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Banking import error:", error);
    return json({ ok: false, error: "Erro na importação bancária" }, 500);
  }
}

// Simulate fetching transactions from Open Banking API
async function fetchBankTransactions(connection: any, fromDate: string, toDate: string) {
  // In production, this would make actual API calls to the bank
  // For demo purposes, return sample transactions
  return [
    {
      id: `txn_${Date.now()}_1`,
      amount: 850.00,
      booking_date: "2026-04-01",
      description: "Transferencia SEPA - João Silva",
      reference: "RENT_APR_2026",
      creditor_name: "João Silva",
      creditor_account: "PT50123456789012345678901"
    },
    {
      id: `txn_${Date.now()}_2`,
      amount: 1200.00,
      booking_date: "2026-04-05",
      description: "MB WAY - Maria Santos",
      reference: "Renda Abril",
      creditor_name: "Maria Santos",
      creditor_account: null
    }
  ];
}

// Match transaction with expected rental payment
function findPaymentMatch(transaction: any, expectedPayments: any[]) {
  const transactionAmount = Math.abs(transaction.amount);

  // Look for exact amount and date matches first
  let match = expectedPayments.find(payment =>
    Math.abs(Number(payment.amount) - transactionAmount) < 0.01 &&
    Math.abs(new Date(payment.due_date).getTime() - new Date(transaction.booking_date).getTime()) < 7 * 24 * 60 * 60 * 1000 // within 7 days
  );

  if (match) return match;

  // Look for tenant name matches in transaction description
  match = expectedPayments.find(payment => {
    const tenantName = payment.tenant_name.toLowerCase();
    const description = transaction.description.toLowerCase();
    const creditorName = (transaction.creditor_name || '').toLowerCase();

    const nameMatches = description.includes(tenantName) || creditorName.includes(tenantName);
    const amountMatches = Math.abs(Number(payment.amount) - transactionAmount) < 0.01;

    return nameMatches && amountMatches;
  });

  return match || null;
}

// Determine if transaction might be a rental payment
function isPotentialRentalPayment(transaction: any) {
  const description = transaction.description.toLowerCase();
  const reference = (transaction.reference || '').toLowerCase();
  const amount = Math.abs(transaction.amount);

  // Check for rental keywords
  const rentalKeywords = ['renda', 'rent', 'aluguer', 'arrendamento', 'habitacao'];
  const hasRentalKeyword = rentalKeywords.some(keyword =>
    description.includes(keyword) || reference.includes(keyword)
  );

  // Check for reasonable rental amount (€300 - €5000)
  const isReasonableAmount = amount >= 300 && amount <= 5000;

  return hasRentalKeyword || (isReasonableAmount && transaction.amount > 0);
}