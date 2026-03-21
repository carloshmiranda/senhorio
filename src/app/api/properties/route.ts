import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// GET /api/properties — list user's properties
export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();

    const properties = await sql`
      SELECT
        p.*,
        (SELECT COUNT(*) FROM tenants t WHERE t.property_id = p.id AND t.status = 'active') as active_tenants,
        (SELECT COALESCE(SUM(t.rent_amount), 0) FROM tenants t WHERE t.property_id = p.id AND t.status = 'active') as monthly_income
      FROM properties p
      WHERE p.owner_id = ${user.userId}
      ORDER BY p.created_at DESC
    `;

    return json({ ok: true, data: properties });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Properties list error:", error);
    return json({ ok: false, error: "Erro ao listar imóveis" }, 500);
  }
}

// POST /api/properties — create a new property
export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const body = await req.json();

    const {
      address,
      city,
      municipality,
      property_type,
      typology,
      area_m2,
      year_built,
      license_number,
      fiscal_value,
    } = body as {
      address?: string;
      city?: string;
      municipality?: string;
      property_type?: string;
      typology?: string;
      area_m2?: number;
      year_built?: number;
      license_number?: string;
      fiscal_value?: number;
    };

    if (!address) {
      return json({ ok: false, error: "Morada é obrigatória" }, 400);
    }

    const validTypes = ["apartment", "house", "commercial", "land"];
    if (property_type && !validTypes.includes(property_type)) {
      return json({ ok: false, error: "Tipo de imóvel inválido" }, 400);
    }

    const validTypologies = ["T0", "T1", "T2", "T3", "T4", "T5+"];
    if (typology && !validTypologies.includes(typology)) {
      return json({ ok: false, error: "Tipologia inválida" }, 400);
    }

    const [property] = await sql`
      INSERT INTO properties (owner_id, address, city, municipality, property_type, typology, area_m2, year_built, license_number, fiscal_value)
      VALUES (
        ${user.userId},
        ${address},
        ${city || null},
        ${municipality || null},
        ${property_type || "apartment"},
        ${typology || null},
        ${area_m2 || null},
        ${year_built || null},
        ${license_number || null},
        ${fiscal_value || null}
      )
      RETURNING *
    `;

    return json({ ok: true, data: property }, 201);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Property create error:", error);
    return json({ ok: false, error: "Erro ao criar imóvel" }, 500);
  }
}
