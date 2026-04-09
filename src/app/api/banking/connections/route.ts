import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// GET /api/banking/connections — list user's banking connections
export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();

    const connections = await sql`
      SELECT
        id,
        bank_name,
        account_name,
        account_iban,
        connection_status,
        last_sync,
        created_at,
        auto_import_enabled
      FROM banking_connections
      WHERE user_id = ${user.userId}
      ORDER BY created_at DESC
    `;

    return json({ ok: true, data: connections });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Banking connections list error:", error);
    return json({ ok: false, error: "Erro ao listar ligações bancárias" }, 500);
  }
}

// POST /api/banking/connections — create new banking connection
export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const body = await req.json();

    const {
      bank_name,
      account_name,
      account_iban,
      bank_api_provider,
      auto_import_enabled = true
    } = body;

    if (!bank_name || !account_name || !account_iban) {
      return json({ ok: false, error: "Nome do banco, conta e IBAN são obrigatórios" }, 400);
    }

    // Validate IBAN format (basic Portuguese IBAN validation)
    const ibanRegex = /^PT\d{2}\d{4}\d{4}\d{11}$/;
    if (!ibanRegex.test(account_iban.replace(/\s/g, ''))) {
      return json({ ok: false, error: "IBAN português inválido" }, 400);
    }

    // Check if connection already exists for this account
    const [existing] = await sql`
      SELECT id FROM banking_connections
      WHERE user_id = ${user.userId} AND account_iban = ${account_iban.replace(/\s/g, '')}
    `;

    if (existing) {
      return json({ ok: false, error: "Ligação para esta conta já existe" }, 409);
    }

    const [connection] = await sql`
      INSERT INTO banking_connections (
        user_id,
        bank_name,
        account_name,
        account_iban,
        bank_api_provider,
        connection_status,
        auto_import_enabled,
        created_at
      )
      VALUES (
        ${user.userId},
        ${bank_name},
        ${account_name},
        ${account_iban.replace(/\s/g, '')},
        ${bank_api_provider || 'open_banking'},
        'pending',
        ${auto_import_enabled},
        NOW()
      )
      RETURNING *
    `;

    return json({
      ok: true,
      data: connection,
      message: "Ligação bancária criada. Configure as credenciais para ativar a importação automática."
    }, 201);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Banking connection create error:", error);
    return json({ ok: false, error: "Erro ao criar ligação bancária" }, 500);
  }
}