import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// GET /api/receipts/[id] — get receipt details
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const resolvedParams = await params;
    const receiptId = resolvedParams.id;

    if (!receiptId) {
      return json({ ok: false, error: "ID do recibo é obrigatório" }, 400);
    }

    const [receipt] = await sql`
      SELECT
        r.*,
        t.name as tenant_name,
        t.nif as tenant_nif,
        t.email as tenant_email,
        t.phone as tenant_phone,
        p.address as property_address,
        p.city as property_city,
        p.municipality as property_municipality,
        u.name as landlord_name,
        u.email as landlord_email
      FROM receipts r
      JOIN tenants t ON t.id = r.tenant_id
      JOIN properties p ON p.id = r.property_id
      JOIN users u ON u.id = p.owner_id
      WHERE r.id = ${receiptId} AND p.owner_id = ${user.userId}
    `;

    if (!receipt) {
      return json({ ok: false, error: "Recibo não encontrado" }, 404);
    }

    return json({ ok: true, data: receipt });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Receipt get error:", error);
    return json({ ok: false, error: "Erro ao obter recibo" }, 500);
  }
}