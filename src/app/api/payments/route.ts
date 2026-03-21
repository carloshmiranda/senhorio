import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// GET /api/payments — list payments for user's tenants
export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();

    const tenantId = req.nextUrl.searchParams.get("tenant_id");
    const statusFilter = req.nextUrl.searchParams.get("status");

    let payments;

    if (tenantId) {
      const [tenant] = await sql`
        SELECT t.id FROM tenants t
        JOIN properties p ON p.id = t.property_id
        WHERE t.id = ${tenantId} AND p.owner_id = ${user.userId}
      `;
      if (!tenant) {
        return json({ ok: false, error: "Inquilino não encontrado" }, 404);
      }

      if (statusFilter) {
        payments = await sql`
          SELECT rp.*, t.name as tenant_name, p.address as property_address
          FROM rental_payments rp
          JOIN tenants t ON t.id = rp.tenant_id
          JOIN properties p ON p.id = t.property_id
          WHERE rp.tenant_id = ${tenantId} AND rp.status = ${statusFilter}
          ORDER BY rp.due_date DESC
        `;
      } else {
        payments = await sql`
          SELECT rp.*, t.name as tenant_name, p.address as property_address
          FROM rental_payments rp
          JOIN tenants t ON t.id = rp.tenant_id
          JOIN properties p ON p.id = t.property_id
          WHERE rp.tenant_id = ${tenantId}
          ORDER BY rp.due_date DESC
        `;
      }
    } else {
      if (statusFilter) {
        payments = await sql`
          SELECT rp.*, t.name as tenant_name, p.address as property_address
          FROM rental_payments rp
          JOIN tenants t ON t.id = rp.tenant_id
          JOIN properties p ON p.id = t.property_id
          WHERE p.owner_id = ${user.userId} AND rp.status = ${statusFilter}
          ORDER BY rp.due_date DESC
        `;
      } else {
        payments = await sql`
          SELECT rp.*, t.name as tenant_name, p.address as property_address
          FROM rental_payments rp
          JOIN tenants t ON t.id = rp.tenant_id
          JOIN properties p ON p.id = t.property_id
          WHERE p.owner_id = ${user.userId}
          ORDER BY rp.due_date DESC
        `;
      }
    }

    return json({ ok: true, data: payments });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Payments list error:", error);
    return json({ ok: false, error: "Erro ao listar pagamentos" }, 500);
  }
}

// POST /api/payments — record a payment
export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const body = await req.json();

    const {
      tenant_id,
      amount,
      due_date,
      paid_date,
      payment_method,
      status: paymentStatus,
      notes,
    } = body as {
      tenant_id?: string;
      amount?: number;
      due_date?: string;
      paid_date?: string;
      payment_method?: string;
      status?: string;
      notes?: string;
    };

    if (!tenant_id || !amount || !due_date) {
      return json({ ok: false, error: "Inquilino, valor e data de vencimento são obrigatórios" }, 400);
    }

    const [tenant] = await sql`
      SELECT t.id FROM tenants t
      JOIN properties p ON p.id = t.property_id
      WHERE t.id = ${tenant_id} AND p.owner_id = ${user.userId}
    `;
    if (!tenant) {
      return json({ ok: false, error: "Inquilino não encontrado" }, 404);
    }

    const validMethods = ["transfer", "mbway", "cash", "check"];
    if (payment_method && !validMethods.includes(payment_method)) {
      return json({ ok: false, error: "Método de pagamento inválido" }, 400);
    }

    const validStatuses = ["pending", "paid", "overdue", "partial"];
    const finalStatus = paymentStatus || (paid_date ? "paid" : "pending");
    if (!validStatuses.includes(finalStatus)) {
      return json({ ok: false, error: "Estado de pagamento inválido" }, 400);
    }

    const [payment] = await sql`
      INSERT INTO rental_payments (tenant_id, amount, due_date, paid_date, payment_method, status, notes)
      VALUES (
        ${tenant_id},
        ${amount},
        ${due_date},
        ${paid_date || null},
        ${payment_method || null},
        ${finalStatus},
        ${notes || null}
      )
      RETURNING *
    `;

    return json({ ok: true, data: payment }, 201);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Payment create error:", error);
    return json({ ok: false, error: "Erro ao registar pagamento" }, 500);
  }
}
