import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const { authorization } = await request.json()

    // Simple security check - require a setup key
    if (authorization !== process.env.SETUP_SECRET) {
      return NextResponse.json({
        ok: false,
        error: 'Unauthorized'
      }, { status: 401 })
    }

    console.log('🏗️  Setting up Senhorio database...')

    // Test database connection
    const sql = getDb()
    const result = await sql`SELECT 1 as test`
    console.log('✅ Database connection successful!')

    // Check if tables already exist
    const tables = await sql`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `

    if (tables.length > 0) {
      console.log(`✅ Found ${tables.length} tables:`, tables.map(t => t.table_name).join(', '))
      return NextResponse.json({
        ok: true,
        data: {
          message: 'Database already set up',
          tables: tables.length,
          tableNames: tables.map(t => t.table_name)
        }
      })
    }

    // Apply schema
    console.log('📝 Applying database schema...')
    const schemaPath = path.join(process.cwd(), 'schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')

    // Split by semicolon and execute each statement
    const statements = schema.split(';').filter(stmt => stmt.trim().length > 0)
    let executedStatements = 0

    for (const statement of statements) {
      const cleanStatement = statement.trim()
      if (cleanStatement) {
        try {
          await sql.unsafe(cleanStatement)
          executedStatements++
        } catch (error: any) {
          if (error.message.includes('already exists')) {
            console.log('⚠️  Statement skipped (already exists)')
          } else {
            throw error
          }
        }
      }
    }

    // Verify tables were created
    const finalTables = await sql`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `

    console.log(`✅ Created ${finalTables.length} tables`)

    // Test waitlist functionality
    const testEmail = `test-${Date.now()}@example.com`
    const referralCode = `TEST${Date.now()}`

    await sql`
      INSERT INTO waitlist (email, name, referral_code, position, source)
      VALUES (${testEmail}, 'Setup Test', ${referralCode}, 1, 'setup_test')
    `

    const [testResult] = await sql`
      SELECT email, name, referral_code, position, created_at
      FROM waitlist WHERE email = ${testEmail}
    `

    // Clean up test data
    await sql`DELETE FROM waitlist WHERE email = ${testEmail}`

    return NextResponse.json({
      ok: true,
      data: {
        message: 'Database setup completed successfully',
        tablesCreated: finalTables.length,
        statementsExecuted: executedStatements,
        waitlistTest: testResult ? 'passed' : 'failed'
      }
    })

  } catch (error: any) {
    console.error('❌ Database setup failed:', error)
    return NextResponse.json({
      ok: false,
      error: error.message || 'Database setup failed'
    }, { status: 500 })
  }
}