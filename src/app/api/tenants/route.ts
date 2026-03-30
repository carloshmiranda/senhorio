import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// GET /api/tenants — list tenants for user's properties
export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();

    const propertyId = req.nextUrl.searchParams.get("property_id");

    let tenants;
    if (propertyId) {
      const [property] = await sql`
        SELECT id FROM properties WHERE id = ${propertyId} AND owner_id = ${user.userId}
      `;
      if (!property) {
        return json({ ok: false, error: "Imóvel não encontrado" }, 404);
      }

      tenants = await sql`
        SELECT t.*, p.address as property_address
        FROM tenants t
        JOIN properties p ON p.id = t.property_id
        WHERE t.property_id = ${propertyId}
        ORDER BY t.created_at DESC
      `;
    } else {
      tenants = await sql`
        SELECT t.*, p.address as property_address
        FROM tenants t
        JOIN properties p ON p.id = t.property_id
        WHERE p.owner_id = ${user.userId}
        ORDER BY t.created_at DESC
      `;
    }

    return json({ ok: true, data: tenants });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Tenants list error:", error);
    return json({ ok: false, error: "Erro ao listar inquilinos" }, 500);
  }
}

// POST /api/tenants — create a new tenant
export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const body = await req.json();

    const {
      property_id,
      name,
      email,
      phone,
      nif,
      contract_start,
      contract_end,
      contract_type,
      rent_amount,
      payment_day,
      deposit_amount,
    } = body as {
      property_id?: string;
      name?: string;
      email?: string;
      phone?: string;
      nif?: string;
      contract_start?: string;
      contract_end?: string;
      contract_type?: string;
      rent_amount?: number;
      payment_day?: number;
      deposit_amount?: number;
    };

    if (!property_id || !name || !contract_start || !rent_amount) {
      return json({ ok: false, error: "Imóvel, nome, data de início e valor da renda são obrigatórios" }, 400);
    }

    const [property] = await sql`
      SELECT id FROM properties WHERE id = ${property_id} AND owner_id = ${user.userId}
    `;
    if (!property) {
      return json({ ok: false, error: "Imóvel não encontrado" }, 404);
    }

    const validContractTypes = ["residential", "commercial", "student", "temporary"];
    if (contract_type && !validContractTypes.includes(contract_type)) {
      return json({ ok: false, error: "Tipo de contrato inválido" }, 400);
    }

    if (payment_day && (payment_day < 1 || payment_day > 31)) {
      return json({ ok: false, error: "Dia de pagamento deve ser entre 1 e 31" }, 400);
    }

    const [tenant] = await sql`
      INSERT INTO tenants (property_id, name, email, phone, nif, contract_start, contract_end, contract_type, rent_amount, payment_day, deposit_amount)
      VALUES (
        ${property_id},
        ${name},
        ${email || null},
        ${phone || null},
        ${nif || null},
        ${contract_start},
        ${contract_end || null},
        ${contract_type || "residential"},
        ${rent_amount},
        ${payment_day || 1},
        ${deposit_amount || null}
      )
      RETURNING *
    `;

    return json({ ok: true, data: tenant }, 201);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Tenant create error:", error);
    return json({ ok: false, error: "Erro ao criar inquilino" }, 500);
  }
}

// PUT /api/tenants — update a tenant
export async function PUT(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const body = await req.json();

    const {
      id,
      property_id,
      name,
      email,
      phone,
      nif,
      contract_start,
      contract_end,
      contract_type,
      rent_amount,
      payment_day,
      deposit_amount,
      status,
    } = body as {
      id?: string;
      property_id?: string;
      name?: string;
      email?: string;
      phone?: string;
      nif?: string;
      contract_start?: string;
      contract_end?: string;
      contract_type?: string;
      rent_amount?: number;
      payment_day?: number;
      deposit_amount?: number;
      status?: string;
    };

    if (!id || !property_id || !name || !contract_start || !rent_amount) {
      return json({ ok: false, error: "ID, imóvel, nome, data de início e valor da renda são obrigatórios" }, 400);
    }

    // Verify tenant belongs to user's property
    const [existing] = await sql`
      SELECT t.id FROM tenants t
      JOIN properties p ON p.id = t.property_id
      WHERE t.id = ${id} AND p.owner_id = ${user.userId}
    `;
    if (!existing) {
      return json({ ok: false, error: "Inquilino não encontrado" }, 404);
    }

    // Verify new property belongs to user
    const [property] = await sql`
      SELECT id FROM properties WHERE id = ${property_id} AND owner_id = ${user.userId}
    `;
    if (!property) {
      return json({ ok: false, error: "Imóvel não encontrado" }, 404);
    }

    const validContractTypes = ["residential", "commercial", "student", "temporary"];
    if (contract_type && !validContractTypes.includes(contract_type)) {
      return json({ ok: false, error: "Tipo de contrato inválido" }, 400);
    }

    if (payment_day && (payment_day < 1 || payment_day > 31)) {
      return json({ ok: false, error: "Dia de pagamento deve ser entre 1 e 31" }, 400);
    }

    const validStatuses = ["active", "inactive", "terminated"];
    if (status && !validStatuses.includes(status)) {
      return json({ ok: false, error: "Estado inválido" }, 400);
    }

    const [tenant] = await sql`
      UPDATE tenants SET
        property_id = ${property_id},
        name = ${name},
        email = ${email || null},
        phone = ${phone || null},
        nif = ${nif || null},
        contract_start = ${contract_start},
        contract_end = ${contract_end || null},
        contract_type = ${contract_type || "residential"},
        rent_amount = ${rent_amount},
        payment_day = ${payment_day || 1},
        deposit_amount = ${deposit_amount || null},
        status = ${status || "active"},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    return json({ ok: true, data: tenant });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Tenant update error:", error);
    return json({ ok: false, error: "Erro ao atualizar inquilino" }, 500);
  }
}

// DELETE /api/tenants — delete a tenant
export async function DELETE(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const { searchParams } = new URL(req.url);
    const tenantId = searchParams.get("id");

    if (!tenantId) {
      return json({ ok: false, error: "ID do inquilino é obrigatório" }, 400);
    }

    // Verify tenant belongs to user's property
    const [tenant] = await sql`
      SELECT t.id FROM tenants t
      JOIN properties p ON p.id = t.property_id
      WHERE t.id = ${tenantId} AND p.owner_id = ${user.userId}
    `;
    if (!tenant) {
      return json({ ok: false, error: "Inquilino não encontrado" }, 404);
    }

    // Delete the tenant
    await sql`
      DELETE FROM tenants WHERE id = ${tenantId}
    `;

    return json({ ok: true, message: "Inquilino eliminado com sucesso" });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Tenant delete error:", error);
    return json({ ok: false, error: "Erro ao eliminar inquilino" }, 500);
  }
}
