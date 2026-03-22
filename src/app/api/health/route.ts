import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET() {
  try {
    const sql = getDb()
    // Test database connection
    const dbCheck = await sql`SELECT 1 as status`

    return NextResponse.json({
      ok: true,
      data: {
        status: 'healthy',
        database: dbCheck.length > 0 ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: 'Database connection failed',
      data: {
        status: 'unhealthy',
        database: 'disconnected',
        timestamp: new Date().toISOString()
      }
    }, { status: 503 })
  }
}