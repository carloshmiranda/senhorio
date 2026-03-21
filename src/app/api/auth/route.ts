import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { hashPassword, verifyPassword, createToken } from "@/lib/auth";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// POST /api/auth — login or register
// Body: { action: "login" | "register", email, password, name? }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, email, password, name } = body as {
      action: string;
      email?: string;
      password?: string;
      name?: string;
    };

    if (action === "logout") {
      const response = json({ ok: true });
      response.cookies.delete("senhorio_token");
      return response;
    }

    if (!email || !email.includes("@")) {
      return json({ ok: false, error: "Email válido é obrigatório" }, 400);
    }

    if (!password || password.length < 6) {
      return json({ ok: false, error: "Password deve ter pelo menos 6 caracteres" }, 400);
    }

    const sql = getDb();

    if (action === "register") {
      const [existing] = await sql`SELECT id FROM customers WHERE email = ${email}`;
      if (existing) {
        return json({ ok: false, error: "Este email já está registado" }, 409);
      }

      const hashed = await hashPassword(password);

      const [user] = await sql`
        INSERT INTO customers (email, name, password_hash)
        VALUES (${email}, ${name || null}, ${hashed})
        RETURNING id, email, name
      `;

      const token = await createToken(user.id, user.email);

      const response = json({ ok: true, user: { id: user.id, email: user.email, name: user.name } });
      response.cookies.set("senhorio_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    if (action === "login") {
      const [user] = await sql`
        SELECT id, email, name, password_hash FROM customers WHERE email = ${email}
      `;

      if (!user || !user.password_hash) {
        return json({ ok: false, error: "Email ou password incorretos" }, 401);
      }

      const valid = await verifyPassword(password, user.password_hash);
      if (!valid) {
        return json({ ok: false, error: "Email ou password incorretos" }, 401);
      }

      const token = await createToken(user.id, user.email);

      const response = json({ ok: true, user: { id: user.id, email: user.email, name: user.name } });
      response.cookies.set("senhorio_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    return json({ ok: false, error: "Ação inválida. Use 'login', 'register' ou 'logout'" }, 400);
  } catch (error: any) {
    console.error("Auth error:", error);
    return json({ ok: false, error: "Erro de autenticação" }, 500);
  }
}

// GET /api/auth — check current session
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("senhorio_token")?.value;
    if (!token) {
      return json({ ok: true, user: null });
    }

    const { verifyToken } = await import("@/lib/auth");
    const payload = await verifyToken(token);
    if (!payload) {
      return json({ ok: true, user: null });
    }

    const sql = getDb();
    const [user] = await sql`
      SELECT id, email, name FROM customers WHERE id = ${payload.userId}
    `;

    return json({ ok: true, user: user || null });
  } catch (error: any) {
    console.error("Auth check error:", error);
    return json({ ok: true, user: null });
  }
}
