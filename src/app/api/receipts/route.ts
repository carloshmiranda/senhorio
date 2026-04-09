import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { checkRateLimit, createRateLimitResponse, RATE_LIMITS } from "@/lib/rate-limit";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// GET /api/receipts — list user's receipts
export async function GET(req: NextRequest) {
  // Apply rate limiting for data read operations
  const rateLimitResult = checkRateLimit(req, 'receipts-read', RATE_LIMITS.DATA_READ);
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(
      false,
      rateLimitResult.remainingRequests,
      rateLimitResult.resetTime,
      rateLimitResult.error
    );
  }

  try {
    const user = await requireAuth(req);
    const sql = getDb();

    const receipts = await sql`
      SELECT
        r.*,
        t.name as tenant_name,
        p.address as property_address
      FROM receipts r
      JOIN tenants t ON t.id = r.tenant_id
      JOIN properties p ON p.id = r.property_id
      WHERE p.owner_id = ${user.userId}
      ORDER BY r.created_at DESC
    `;

    return json({ ok: true, data: receipts });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Receipts list error:", error);
    return json({ ok: false, error: "Erro ao listar recibos" }, 500);
  }
}

// POST /api/receipts — create a new receipt
export async function POST(req: NextRequest) {
  // Apply rate limiting for data creation operations
  const rateLimitResult = checkRateLimit(req, 'receipts-create', RATE_LIMITS.DATA_CREATION);
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(
      false,
      rateLimitResult.remainingRequests,
      rateLimitResult.resetTime,
      rateLimitResult.error
    );
  }

  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const body = await req.json();

    const {
      tenant_id,
      property_id,
      amount,
      period_month,
      period_year,
      issue_date,
      receipt_number,
    } = body as {
      tenant_id?: string;
      property_id?: string;
      amount?: number;
      period_month?: number;
      period_year?: number;
      issue_date?: string;
      receipt_number?: string;
    };

    if (!tenant_id || !property_id || !amount || !period_month || !period_year || !issue_date) {
      return json({ ok: false, error: "Todos os campos obrigatórios devem ser preenchidos" }, 400);
    }

    // Verify property ownership
    const [property] = await sql`
      SELECT id FROM properties WHERE id = ${property_id} AND owner_id = ${user.userId}
    `;
    if (!property) {
      return json({ ok: false, error: "Imóvel não encontrado" }, 404);
    }

    // Verify tenant belongs to property
    const [tenant] = await sql`
      SELECT id FROM tenants WHERE id = ${tenant_id} AND property_id = ${property_id}
    `;
    if (!tenant) {
      return json({ ok: false, error: "Inquilino não encontrado neste imóvel" }, 404);
    }

    // Generate receipt number if not provided
    let finalReceiptNumber = receipt_number;
    if (!finalReceiptNumber) {
      const date = new Date(issue_date);
      const datePrefix = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;

      // Check existing receipts for this date to generate sequential number
      const existingReceipts = await sql`
        SELECT receipt_number FROM receipts
        WHERE receipt_number LIKE ${datePrefix + '%'}
        ORDER BY receipt_number DESC
        LIMIT 1
      `;

      let sequence = 1;
      if (existingReceipts.length > 0) {
        const lastNumber = existingReceipts[0].receipt_number;
        const lastSequence = parseInt(lastNumber.split('-')[1] || '0');
        sequence = lastSequence + 1;
      }

      finalReceiptNumber = `${datePrefix}-${String(sequence).padStart(3, '0')}`;
    }

    // Check for duplicate receipt number
    const [existingReceipt] = await sql`
      SELECT id FROM receipts WHERE receipt_number = ${finalReceiptNumber}
    `;
    if (existingReceipt) {
      return json({ ok: false, error: "Número de recibo já existe. Use um número diferente." }, 400);
    }

    const [receipt] = await sql`
      INSERT INTO receipts (tenant_id, property_id, amount, period_month, period_year, issue_date, receipt_number)
      VALUES (
        ${tenant_id},
        ${property_id},
        ${amount},
        ${period_month},
        ${period_year},
        ${issue_date},
        ${finalReceiptNumber}
      )
      RETURNING *
    `;

    return json({ ok: true, data: receipt }, 201);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Receipt create error:", error);
    return json({ ok: false, error: "Erro ao criar recibo" }, 500);
  }
}

// DELETE /api/receipts — delete a receipt
export async function DELETE(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const { searchParams } = new URL(req.url);
    const receiptId = searchParams.get("id");

    if (!receiptId) {
      return json({ ok: false, error: "ID do recibo é obrigatório" }, 400);
    }

    // Verify receipt belongs to user's property
    const [receipt] = await sql`
      SELECT r.id FROM receipts r
      JOIN properties p ON p.id = r.property_id
      WHERE r.id = ${receiptId} AND p.owner_id = ${user.userId}
    `;
    if (!receipt) {
      return json({ ok: false, error: "Recibo não encontrado" }, 404);
    }

    // Delete the receipt
    await sql`
      DELETE FROM receipts WHERE id = ${receiptId}
    `;

    return json({ ok: true, message: "Recibo eliminado com sucesso" });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Receipt delete error:", error);
    return json({ ok: false, error: "Erro ao eliminar recibo" }, 500);
  }
}