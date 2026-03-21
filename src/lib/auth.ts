import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "senhorio-dev-secret-change-in-production";

// Simple base64url encoding/decoding
function base64url(str: string): string {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlDecode(str: string): string {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return atob(str);
}

// HMAC-SHA256 signing using Web Crypto API (Edge-compatible)
async function sign(payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return base64url(String.fromCharCode(...new Uint8Array(signature)));
}

async function verify(payload: string, signature: string): Promise<boolean> {
  const expected = await sign(payload);
  return expected === signature;
}

// Simple password hashing using SHA-256 + salt (Edge-compatible, no bcrypt needed)
export async function hashPassword(password: string): Promise<string> {
  const salt = base64url(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const hashStr = base64url(String.fromCharCode(...new Uint8Array(hash)));
  return `${salt}.${hashStr}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, storedHash] = stored.split(".");
  if (!salt || !storedHash) return false;
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const hashStr = base64url(String.fromCharCode(...new Uint8Array(hash)));
  return hashStr === storedHash;
}

// JWT token creation and verification
export interface TokenPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export async function createToken(userId: string, email: string): Promise<string> {
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const now = Math.floor(Date.now() / 1000);
  const payload = base64url(
    JSON.stringify({
      userId,
      email,
      iat: now,
      exp: now + 60 * 60 * 24 * 7, // 7 days
    })
  );
  const content = `${header}.${payload}`;
  const sig = await sign(content);
  return `${content}.${sig}`;
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [header, payload, sig] = parts;
    const content = `${header}.${payload}`;
    const valid = await verify(content, sig);
    if (!valid) return null;

    const decoded = JSON.parse(base64urlDecode(payload)) as TokenPayload;
    if (decoded.exp < Math.floor(Date.now() / 1000)) return null;

    return decoded;
  } catch {
    return null;
  }
}

// Extract token from request (cookie or Authorization header)
function getTokenFromRequest(req: NextRequest): string | null {
  // Check cookie first
  const cookie = req.cookies.get("senhorio_token");
  if (cookie?.value) return cookie.value;

  // Check Authorization header
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  return null;
}

// Middleware helper: returns user payload or null
export async function getUser(req: NextRequest): Promise<TokenPayload | null> {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  return verifyToken(token);
}

// Middleware helper: returns user payload or throws
export async function requireAuth(req: NextRequest): Promise<TokenPayload> {
  const user = await getUser(req);
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}
