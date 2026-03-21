#!/usr/bin/env node
/**
 * Database setup script for Senhorio
 *
 * This script provisions a Neon database and applies the schema.
 * Run with: node scripts/setup-database.js
 */

const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  console.log('🏗️  Setting up Senhorio database...\n');

  // Check if DATABASE_URL is already set
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl) {
    console.log('✅ DATABASE_URL already configured');
    console.log('📍 Testing connection...\n');

    try {
      // Test the connection by importing and using our db helper
      const { getDb } = require('../src/lib/db');
      const sql = getDb();
      const result = await sql`SELECT 1 as test`;
      console.log('✅ Database connection successful!');

      // Check if tables exist
      const tables = await sql`
        SELECT table_name FROM information_schema.tables
        WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      `;

      if (tables.length > 0) {
        console.log(`✅ Found ${tables.length} tables:`, tables.map(t => t.table_name).join(', '));
        console.log('\n🎉 Database is ready to use!');
        return;
      } else {
        console.log('⚠️  Database connected but no tables found. Running schema...');
        await runSchema(sql);
      }

    } catch (error) {
      console.error('❌ Database connection failed:', error.message);
      process.exit(1);
    }

    return;
  }

  console.log('❌ DATABASE_URL not configured. Please follow these steps:\n');
  console.log('1. Create a Neon project:');
  console.log('   → Go to https://console.neon.tech');
  console.log('   → Create a new project named "senhorio"');
  console.log('   → Select region: AWS eu-central-1 (Frankfurt) - closest to Portugal');
  console.log('   → Copy the connection string\n');

  console.log('2. Set the DATABASE_URL in Vercel:');
  console.log('   → Go to https://vercel.com/carloshmiranda/senhorio/settings/environment-variables');
  console.log('   → Add DATABASE_URL with your Neon connection string');
  console.log('   → Set target: Production, Preview, Development\n');

  console.log('3. Redeploy the application:');
  console.log('   → Trigger a redeploy in Vercel or push to main branch\n');

  console.log('4. Run this script again to apply the schema:');
  console.log('   → DATABASE_URL=your_neon_url node scripts/setup-database.js\n');

  console.log('💡 Need help? Check the Neon documentation at https://neon.tech/docs');
}

async function runSchema(sql) {
  console.log('📝 Applying database schema...\n');

  try {
    const schemaPath = path.join(__dirname, '../schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Split by semicolon and execute each statement
    const statements = schema.split(';').filter(stmt => stmt.trim().length > 0);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i].trim();
      if (statement) {
        try {
          await sql.unsafe(statement);
          console.log(`✅ Statement ${i + 1}/${statements.length} executed`);
        } catch (error) {
          if (error.message.includes('already exists')) {
            console.log(`⚠️  Statement ${i + 1}/${statements.length} skipped (already exists)`);
          } else {
            throw error;
          }
        }
      }
    }

    console.log('\n🎉 Schema applied successfully!');

    // Verify tables were created
    const tables = await sql`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `;

    console.log(`✅ Created ${tables.length} tables:`, tables.map(t => t.table_name).join(', '));

    // Test waitlist API is working
    console.log('\n🧪 Testing waitlist API...');
    await testWaitlistAPI();

  } catch (error) {
    console.error('❌ Schema application failed:', error);
    process.exit(1);
  }
}

async function testWaitlistAPI() {
  try {
    const { getDb } = require('../src/lib/db');
    const sql = getDb();

    // Insert a test entry
    const testEmail = 'test@example.com';
    const testName = 'Database Test';
    const referralCode = 'TEST123';

    await sql`
      INSERT INTO waitlist (email, name, referral_code, position, source)
      VALUES (${testEmail}, ${testName}, ${referralCode}, 1, 'test')
      ON CONFLICT (email) DO NOTHING
    `;

    // Query it back
    const [result] = await sql`
      SELECT email, name, referral_code, position, source, created_at
      FROM waitlist WHERE email = ${testEmail}
    `;

    if (result) {
      console.log('✅ Waitlist API test successful');
      console.log(`   → Email: ${result.email}`);
      console.log(`   → Position: ${result.position}`);
      console.log(`   → Referral Code: ${result.referral_code}`);
    } else {
      console.log('❌ Waitlist API test failed - no data returned');
    }

  } catch (error) {
    console.log('❌ Waitlist API test failed:', error.message);
  }
}

if (require.main === module) {
  setupDatabase().catch(console.error);
}

module.exports = { setupDatabase, runSchema };