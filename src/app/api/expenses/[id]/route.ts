import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// GET /api/expenses/[id] — get single expense
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const { id } = await params;

    const [expense] = await sql`
      SELECT
        e.*,
        p.address as property_address
      FROM expenses e
      JOIN properties p ON p.id = e.property_id
      WHERE e.id = ${id} AND p.owner_id = ${user.userId}
    `;

    if (!expense) {
      return json({ ok: false, error: "Despesa não encontrada" }, 404);
    }

    return json({ ok: true, data: expense });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Expense GET error:", error);
    return json({ ok: false, error: "Erro ao carregar despesa" }, 500);
  }
}

// PUT /api/expenses/[id] — update expense
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const { id } = await params;
    const body = await req.json();

    const { category, description, amount, date, deductible, receipt_url } = body;

    // Verify expense ownership
    const [existingExpense] = await sql`
      SELECT e.id, p.owner_id
      FROM expenses e
      JOIN properties p ON p.id = e.property_id
      WHERE e.id = ${id} AND p.owner_id = ${user.userId}
    `;

    if (!existingExpense) {
      return json({ ok: false, error: "Despesa não encontrada" }, 404);
    }

    // Validation
    if (amount !== undefined && (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0)) {
      return json({ ok: false, error: "Montante deve ser um número positivo" }, 400);
    }

    const validCategories = ['maintenance', 'insurance', 'imu', 'condominium', 'mortgage_interest', 'legal', 'other'];
    if (category !== undefined && !validCategories.includes(category)) {
      return json({ ok: false, error: `Categoria inválida. Use: ${validCategories.join(', ')}` }, 400);
    }

    // Get current expense data
    const [currentExpense] = await sql`
      SELECT * FROM expenses
      WHERE id = ${id}
      AND property_id IN (SELECT id FROM properties WHERE owner_id = ${user.userId})
    `;

    if (!currentExpense) {
      return json({ ok: false, error: "Despesa não encontrada" }, 404);
    }

    // Use current values as defaults and override with provided values
    const updatedCategory = category !== undefined ? category : currentExpense.category;
    const updatedDescription = description !== undefined ? description : currentExpense.description;
    const updatedAmount = amount !== undefined ? parseFloat(amount) : currentExpense.amount;
    const updatedDate = date !== undefined ? date : currentExpense.date;
    const updatedDeductible = deductible !== undefined ? deductible : currentExpense.deductible;
    const updatedReceiptUrl = receipt_url !== undefined ? receipt_url : currentExpense.receipt_url;

    // Update expense
    const [expense] = await sql`
      UPDATE expenses
      SET
        category = ${updatedCategory},
        description = ${updatedDescription},
        amount = ${updatedAmount},
        date = ${updatedDate},
        deductible = ${updatedDeductible},
        receipt_url = ${updatedReceiptUrl}
      WHERE id = ${id}
      RETURNING *
    `;

    return json({ ok: true, data: expense });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Expense PUT error:", error);
    return json({ ok: false, error: "Erro ao atualizar despesa" }, 500);
  }
}

// DELETE /api/expenses/[id] — delete expense
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const { id } = await params;

    // Verify expense ownership and delete
    const [deletedExpense] = await sql`
      DELETE FROM expenses
      WHERE id = ${id}
      AND property_id IN (
        SELECT id FROM properties WHERE owner_id = ${user.userId}
      )
      RETURNING *
    `;

    if (!deletedExpense) {
      return json({ ok: false, error: "Despesa não encontrada" }, 404);
    }

    return json({ ok: true, data: { deleted: true, expense: deletedExpense } });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Expense DELETE error:", error);
    return json({ ok: false, error: "Erro ao eliminar despesa" }, 500);
  }
}