import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// GET /api/expenses — list user's expenses with filtering
export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const { searchParams } = new URL(req.url);
    const propertyId = searchParams.get("property_id");
    const year = searchParams.get("year");
    const category = searchParams.get("category");

    // Build query with conditional filtering
    let expenses;

    if (propertyId && year && category) {
      expenses = await sql`
        SELECT e.*, p.address as property_address
        FROM expenses e
        JOIN properties p ON p.id = e.property_id
        WHERE p.owner_id = ${user.userId}
          AND e.property_id = ${propertyId}
          AND EXTRACT(year FROM e.date) = ${parseInt(year)}
          AND e.category = ${category}
        ORDER BY e.date DESC, e.created_at DESC
      `;
    } else if (propertyId && year) {
      expenses = await sql`
        SELECT e.*, p.address as property_address
        FROM expenses e
        JOIN properties p ON p.id = e.property_id
        WHERE p.owner_id = ${user.userId}
          AND e.property_id = ${propertyId}
          AND EXTRACT(year FROM e.date) = ${parseInt(year)}
        ORDER BY e.date DESC, e.created_at DESC
      `;
    } else if (propertyId && category) {
      expenses = await sql`
        SELECT e.*, p.address as property_address
        FROM expenses e
        JOIN properties p ON p.id = e.property_id
        WHERE p.owner_id = ${user.userId}
          AND e.property_id = ${propertyId}
          AND e.category = ${category}
        ORDER BY e.date DESC, e.created_at DESC
      `;
    } else if (year && category) {
      expenses = await sql`
        SELECT e.*, p.address as property_address
        FROM expenses e
        JOIN properties p ON p.id = e.property_id
        WHERE p.owner_id = ${user.userId}
          AND EXTRACT(year FROM e.date) = ${parseInt(year)}
          AND e.category = ${category}
        ORDER BY e.date DESC, e.created_at DESC
      `;
    } else if (propertyId) {
      expenses = await sql`
        SELECT e.*, p.address as property_address
        FROM expenses e
        JOIN properties p ON p.id = e.property_id
        WHERE p.owner_id = ${user.userId}
          AND e.property_id = ${propertyId}
        ORDER BY e.date DESC, e.created_at DESC
      `;
    } else if (year) {
      expenses = await sql`
        SELECT e.*, p.address as property_address
        FROM expenses e
        JOIN properties p ON p.id = e.property_id
        WHERE p.owner_id = ${user.userId}
          AND EXTRACT(year FROM e.date) = ${parseInt(year)}
        ORDER BY e.date DESC, e.created_at DESC
      `;
    } else if (category) {
      expenses = await sql`
        SELECT e.*, p.address as property_address
        FROM expenses e
        JOIN properties p ON p.id = e.property_id
        WHERE p.owner_id = ${user.userId}
          AND e.category = ${category}
        ORDER BY e.date DESC, e.created_at DESC
      `;
    } else {
      expenses = await sql`
        SELECT e.*, p.address as property_address
        FROM expenses e
        JOIN properties p ON p.id = e.property_id
        WHERE p.owner_id = ${user.userId}
        ORDER BY e.date DESC, e.created_at DESC
      `;
    }

    return json({ ok: true, data: expenses });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Expenses GET error:", error);
    return json({ ok: false, error: "Erro ao carregar despesas" }, 500);
  }
}

// POST /api/expenses — create new expense
export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const body = await req.json();

    const { property_id, category, description, amount, date, deductible = true, receipt_url } = body;

    // Validation
    if (!property_id || !category || !amount || !date) {
      return json({ ok: false, error: "Campos obrigatórios: property_id, category, amount, date" }, 400);
    }

    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return json({ ok: false, error: "Montante deve ser um número positivo" }, 400);
    }

    const validCategories = ['maintenance', 'insurance', 'imu', 'condominium', 'mortgage_interest', 'legal', 'other'];
    if (!validCategories.includes(category)) {
      return json({ ok: false, error: `Categoria inválida. Use: ${validCategories.join(', ')}` }, 400);
    }

    // Verify property ownership
    const [property] = await sql`
      SELECT id FROM properties
      WHERE id = ${property_id} AND owner_id = ${user.userId} AND status = 'active'
    `;

    if (!property) {
      return json({ ok: false, error: "Imóvel não encontrado ou não autorizado" }, 404);
    }

    // Create expense
    const [expense] = await sql`
      INSERT INTO expenses (property_id, category, description, amount, date, deductible, receipt_url)
      VALUES (${property_id}, ${category}, ${description}, ${parseFloat(amount)}, ${date}, ${deductible}, ${receipt_url})
      RETURNING *
    `;

    return json({ ok: true, data: expense });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Expenses POST error:", error);
    return json({ ok: false, error: "Erro ao criar despesa" }, 500);
  }
}