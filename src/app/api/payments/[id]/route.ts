import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// GET /api/payments/[id] — get specific payment
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const { id } = await params;

    const [payment] = await sql`
      SELECT rp.*, t.name as tenant_name, p.address as property_address
      FROM rental_payments rp
      JOIN tenants t ON t.id = rp.tenant_id
      JOIN properties p ON p.id = t.property_id
      WHERE rp.id = ${id} AND p.owner_id = ${user.userId}
    `;

    if (!payment) {
      return json({ ok: false, error: "Pagamento não encontrado" }, 404);
    }

    return json({ ok: true, data: payment });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Payment get error:", error);
    return json({ ok: false, error: "Erro ao obter pagamento" }, 500);
  }
}

// PUT /api/payments/[id] — update payment
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const { id } = await params;
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

    // First verify payment exists and user owns it
    const [existingPayment] = await sql`
      SELECT rp.id FROM rental_payments rp
      JOIN tenants t ON t.id = rp.tenant_id
      JOIN properties p ON p.id = t.property_id
      WHERE rp.id = ${id} AND p.owner_id = ${user.userId}
    `;

    if (!existingPayment) {
      return json({ ok: false, error: "Pagamento não encontrado" }, 404);
    }

    if (!tenant_id || !amount || !due_date) {
      return json({ ok: false, error: "Inquilino, valor e data de vencimento são obrigatórios" }, 400);
    }

    // Verify tenant belongs to user
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
      UPDATE rental_payments
      SET
        tenant_id = ${tenant_id},
        amount = ${amount},
        due_date = ${due_date},
        paid_date = ${paid_date || null},
        payment_method = ${payment_method || null},
        status = ${finalStatus},
        notes = ${notes || null}
      WHERE id = ${id}
      RETURNING *
    `;

    return json({ ok: true, data: payment });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Payment update error:", error);
    return json({ ok: false, error: "Erro ao atualizar pagamento" }, 500);
  }
}

// DELETE /api/payments/[id] — delete payment
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const { id } = await params;

    // First verify payment exists and user owns it
    const [existingPayment] = await sql`
      SELECT rp.id FROM rental_payments rp
      JOIN tenants t ON t.id = rp.tenant_id
      JOIN properties p ON p.id = t.property_id
      WHERE rp.id = ${id} AND p.owner_id = ${user.userId}
    `;

    if (!existingPayment) {
      return json({ ok: false, error: "Pagamento não encontrado" }, 404);
    }

    await sql`DELETE FROM rental_payments WHERE id = ${id}`;

    return json({ ok: true });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Payment delete error:", error);
    return json({ ok: false, error: "Erro ao eliminar pagamento" }, 500);
  }
}