import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// GET /api/banking/connections/[id] — get connection details
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const { id } = await params;

    const [connection] = await sql`
      SELECT
        id,
        bank_name,
        account_name,
        account_iban,
        bank_api_provider,
        connection_status,
        last_sync,
        auto_import_enabled,
        sync_frequency,
        created_at
      FROM banking_connections
      WHERE id = ${id} AND user_id = ${user.userId}
    `;

    if (!connection) {
      return json({ ok: false, error: "Ligação bancária não encontrada" }, 404);
    }

    return json({ ok: true, data: connection });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Banking connection get error:", error);
    return json({ ok: false, error: "Erro ao obter ligação bancária" }, 500);
  }
}

// PATCH /api/banking/connections/[id] — update connection
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const { id } = await params;
    const body = await req.json();

    const {
      account_name,
      auto_import_enabled,
      sync_frequency,
      api_credentials
    } = body;

    // Verify ownership
    const [connection] = await sql`
      SELECT id FROM banking_connections
      WHERE id = ${id} AND user_id = ${user.userId}
    `;

    if (!connection) {
      return json({ ok: false, error: "Ligação bancária não encontrada" }, 404);
    }

    // Simple conditional updates
    let hasUpdates = false;

    if (account_name !== undefined) {
      await sql`UPDATE banking_connections SET account_name = ${account_name}, updated_at = NOW() WHERE id = ${id}`;
      hasUpdates = true;
    }

    if (auto_import_enabled !== undefined) {
      await sql`UPDATE banking_connections SET auto_import_enabled = ${auto_import_enabled}, updated_at = NOW() WHERE id = ${id}`;
      hasUpdates = true;
    }

    if (sync_frequency !== undefined) {
      const validFreqs = ['daily', 'weekly', 'manual'];
      if (validFreqs.includes(sync_frequency)) {
        await sql`UPDATE banking_connections SET sync_frequency = ${sync_frequency}, updated_at = NOW() WHERE id = ${id}`;
        hasUpdates = true;
      }
    }

    if (api_credentials) {
      await sql`UPDATE banking_connections SET api_credentials = ${JSON.stringify(api_credentials)}, connection_status = 'active', updated_at = NOW() WHERE id = ${id}`;
      hasUpdates = true;
    }

    if (!hasUpdates) {
      return json({ ok: false, error: "Nenhuma atualização fornecida" }, 400);
    }

    // Get updated record
    const [updated] = await sql`
      SELECT * FROM banking_connections WHERE id = ${id}
    `;

    return json({ ok: true, data: updated });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Banking connection update error:", error);
    return json({ ok: false, error: "Erro ao atualizar ligação bancária" }, 500);
  }
}

// DELETE /api/banking/connections/[id] — delete connection
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const { id } = await params;

    // Verify ownership
    const [connection] = await sql`
      SELECT id FROM banking_connections
      WHERE id = ${id} AND user_id = ${user.userId}
    `;

    if (!connection) {
      return json({ ok: false, error: "Ligação bancária não encontrada" }, 404);
    }

    await sql`
      DELETE FROM banking_connections
      WHERE id = ${id}
    `;

    return json({ ok: true, message: "Ligação bancária removida com sucesso" });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Banking connection delete error:", error);
    return json({ ok: false, error: "Erro ao remover ligação bancária" }, 500);
  }
}