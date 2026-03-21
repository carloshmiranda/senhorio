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
