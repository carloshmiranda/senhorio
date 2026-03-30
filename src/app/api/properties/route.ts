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

// PUT /api/properties — update a property
export async function PUT(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const body = await req.json();

    const {
      id,
      address,
      city,
      municipality,
      property_type,
      typology,
      area_m2,
      year_built,
      license_number,
      fiscal_value,
      status,
    } = body as {
      id?: string;
      address?: string;
      city?: string;
      municipality?: string;
      property_type?: string;
      typology?: string;
      area_m2?: number;
      year_built?: number;
      license_number?: string;
      fiscal_value?: number;
      status?: string;
    };

    if (!id || !address) {
      return json({ ok: false, error: "ID do imóvel e morada são obrigatórios" }, 400);
    }

    // Verify property ownership
    const [existing] = await sql`
      SELECT id FROM properties WHERE id = ${id} AND owner_id = ${user.userId}
    `;
    if (!existing) {
      return json({ ok: false, error: "Imóvel não encontrado" }, 404);
    }

    const validTypes = ["apartment", "house", "commercial", "land"];
    if (property_type && !validTypes.includes(property_type)) {
      return json({ ok: false, error: "Tipo de imóvel inválido" }, 400);
    }

    const validTypologies = ["T0", "T1", "T2", "T3", "T4", "T5+"];
    if (typology && !validTypologies.includes(typology)) {
      return json({ ok: false, error: "Tipologia inválida" }, 400);
    }

    const validStatuses = ["active", "inactive", "sold"];
    if (status && !validStatuses.includes(status)) {
      return json({ ok: false, error: "Estado inválido" }, 400);
    }

    const [property] = await sql`
      UPDATE properties SET
        address = ${address},
        city = ${city || null},
        municipality = ${municipality || null},
        property_type = ${property_type || "apartment"},
        typology = ${typology || null},
        area_m2 = ${area_m2 || null},
        year_built = ${year_built || null},
        license_number = ${license_number || null},
        fiscal_value = ${fiscal_value || null},
        status = ${status || "active"},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} AND owner_id = ${user.userId}
      RETURNING *
    `;

    return json({ ok: true, data: property });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Property update error:", error);
    return json({ ok: false, error: "Erro ao atualizar imóvel" }, 500);
  }
}

// DELETE /api/properties — delete a property
export async function DELETE(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const { searchParams } = new URL(req.url);
    const propertyId = searchParams.get("id");

    if (!propertyId) {
      return json({ ok: false, error: "ID do imóvel é obrigatório" }, 400);
    }

    // Verify property ownership
    const [property] = await sql`
      SELECT id FROM properties WHERE id = ${propertyId} AND owner_id = ${user.userId}
    `;
    if (!property) {
      return json({ ok: false, error: "Imóvel não encontrado" }, 404);
    }

    // Check for active tenants
    const tenants = await sql`
      SELECT COUNT(*) as count FROM tenants WHERE property_id = ${propertyId} AND status = 'active'
    `;
    if (Number(tenants[0].count) > 0) {
      return json({ ok: false, error: "Não é possível eliminar imóvel com inquilinos ativos" }, 400);
    }

    // Delete the property (this will cascade to related tenants due to foreign key constraints)
    await sql`
      DELETE FROM properties WHERE id = ${propertyId} AND owner_id = ${user.userId}
    `;

    return json({ ok: true, message: "Imóvel eliminado com sucesso" });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Property delete error:", error);
    return json({ ok: false, error: "Erro ao eliminar imóvel" }, 500);
  }
}
