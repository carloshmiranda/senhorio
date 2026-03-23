#!/usr/bin/env node
/**
 * Database provisioning script for Senhorio
 * Alternative approach when Neon API key is broken
 *
 * This script helps configure DATABASE_URL and apply schema
 */

const fs = require('fs');
const path = require('path');

async function provisionDatabase() {
  console.log('🏗️  Provisioning Senhorio database...\n');

  // Check if we have a DATABASE_URL in environment
  let databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.log('⚠️  DATABASE_URL not found in environment');
    console.log('📋 Manual database provisioning required:\n');

    console.log('Option 1: Use existing Neon project (recommended)');
    console.log('1. Connect to your existing Neon project');
    console.log('2. Create a separate schema: CREATE SCHEMA IF NOT EXISTS senhorio;');
    console.log('3. Set search_path for isolation: SET search_path TO senhorio;');
    console.log('4. Get connection string with schema: postgresql://...?options=-csearch_path%3Dsenhorio');
    console.log('5. Set DATABASE_URL in Vercel with this schema-specific URL\n');

    console.log('Option 2: Create new Neon database');
    console.log('1. Go to https://console.neon.tech');
    console.log('2. Create database "senhorio" in existing project');
    console.log('3. Get connection string pointing to senhorio database');
    console.log('4. Set DATABASE_URL in Vercel\n');

    console.log('Then run: npm run setup-db\n');
    process.exit(0);
  }

  console.log('✅ DATABASE_URL found, testing connection...\n');

  try {
    // Test connection
    const { getDb } = require('../src/lib/db');
    const sql = getDb();

    console.log('🔍 Testing database connection...');
    const result = await sql`SELECT 1 as test, current_database() as db_name, current_schema() as schema_name`;
    console.log(`✅ Connected to database: ${result[0].db_name}`);
    console.log(`📍 Current schema: ${result[0].schema_name}`);

    // Check if this is a schema-based setup (senhorio schema)
    const schemas = await sql`SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'senhorio'`;

    if (schemas.length > 0) {
      console.log('✅ Found senhorio schema - using schema-based isolation');
      // Ensure we're using the right schema
      await sql`SET search_path TO senhorio, public`;
    }

    // Check if tables exist
    const tables = await sql`
      SELECT table_name, table_schema
      FROM information_schema.tables
      WHERE table_type = 'BASE TABLE'
      AND table_schema IN (current_schema(), 'public')
      ORDER BY table_schema, table_name
    `;

    if (tables.length > 0) {
      console.log(`✅ Found ${tables.length} existing tables:`);
      tables.forEach(t => console.log(`   → ${t.table_schema}.${t.table_name}`));

      // Check specifically for our key tables
      const keyTables = ['waitlist', 'customers', 'pricing_clicks'];
      const existingKeyTables = tables.filter(t => keyTables.includes(t.table_name));

      if (existingKeyTables.length === keyTables.length) {
        console.log('✅ All key tables exist, database is ready!');
        await testHealthEndpoint();
        return;
      } else {
        console.log('⚠️  Missing key tables, applying schema...');
        await applySchema(sql);
      }
    } else {
      console.log('📝 No tables found, applying full schema...');
      await applySchema(sql);
    }

  } catch (error) {
    console.error('❌ Database provisioning failed:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('1. Check DATABASE_URL format: postgresql://user:pass@host/db');
    console.error('2. Verify database exists and is accessible');
    console.error('3. Check network connectivity to Neon');
    console.error('4. Verify user permissions');
    process.exit(1);
  }
}

async function applySchema(sql) {
  console.log('📝 Applying database schema...\n');

  try {
    const schemaPath = path.join(__dirname, '../schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Split by semicolon and filter out empty statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`🔄 Executing ${statements.length} SQL statements...\n`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement) {
        try {
          await sql.unsafe(statement);
          console.log(`✅ Statement ${i + 1}/${statements.length}: ${statement.substring(0, 50)}...`);
        } catch (error) {
          if (error.message.includes('already exists')) {
            console.log(`⚠️  Statement ${i + 1}/${statements.length}: Already exists, skipping`);
          } else {
            console.error(`❌ Statement ${i + 1}/${statements.length} failed:`, error.message);
            throw error;
          }
        }
      }
    }

    console.log('\n🎉 Schema applied successfully!');

    // Verify critical tables
    const tables = await sql`
      SELECT table_name FROM information_schema.tables
      WHERE table_type = 'BASE TABLE'
      AND table_schema IN (current_schema(), 'public')
      ORDER BY table_name
    `;

    console.log(`✅ Verified ${tables.length} tables:`, tables.map(t => t.table_name).join(', '));

    // Test key functionality
    await testWaitlistFunctionality(sql);
    await testHealthEndpoint();

  } catch (error) {
    console.error('❌ Schema application failed:', error.message);
    throw error;
  }
}

async function testWaitlistFunctionality(sql) {
  console.log('\n🧪 Testing waitlist functionality...');

  try {
    const testEmail = `test-${Date.now()}@example.com`;
    const referralCode = `TEST${Date.now()}`;

    // Insert test entry
    await sql`
      INSERT INTO waitlist (email, name, referral_code, position, source)
      VALUES (${testEmail}, 'Database Test', ${referralCode}, 1, 'provision_test')
    `;

    // Query it back
    const [result] = await sql`
      SELECT email, name, referral_code, position, created_at
      FROM waitlist WHERE email = ${testEmail}
    `;

    if (result) {
      console.log('✅ Waitlist functionality verified');
      console.log(`   → Email: ${result.email}`);
      console.log(`   → Position: ${result.position}`);
      console.log(`   → Created: ${result.created_at}`);

      // Clean up test data
      await sql`DELETE FROM waitlist WHERE email = ${testEmail}`;
      console.log('🗑️  Test data cleaned up');
    } else {
      throw new Error('No data returned from waitlist test');
    }

  } catch (error) {
    console.error('❌ Waitlist test failed:', error.message);
    throw error;
  }
}

async function testHealthEndpoint() {
  console.log('\n🏥 Testing health endpoint...');

  try {
    // We can't directly test the HTTP endpoint from here, but we can test the DB query
    const { getDb } = require('../src/lib/db');
    const sql = getDb();
    const dbCheck = await sql`SELECT 1 as status`;

    if (dbCheck.length > 0) {
      console.log('✅ Health check query successful - API should work');
      console.log('📍 Test deployment: https://senhorio.vercel.app/api/health');
    } else {
      console.log('❌ Health check query failed');
    }

  } catch (error) {
    console.error('❌ Health endpoint test failed:', error.message);
  }
}

if (require.main === module) {
  provisionDatabase().catch(error => {
    console.error('\n💥 Fatal error:', error.message);
    process.exit(1);
  });
}

module.exports = { provisionDatabase, applySchema };