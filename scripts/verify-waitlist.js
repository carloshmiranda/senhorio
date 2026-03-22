#!/usr/bin/env node
/**
 * Waitlist functionality verification script
 *
 * Tests the complete waitlist flow from API to database to ensure
 * lead capture is working properly.
 */

const https = require('https');
const { getDb } = require('../src/lib/db.js');

async function makeHttpRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, {
      method: 'GET',
      ...options
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : {};
          resolve({ status: res.statusCode, data: parsed, raw: data });
        } catch (e) {
          resolve({ status: res.statusCode, data: null, raw: data });
        }
      });
    });

    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...');

  try {
    const sql = getDb();
    const result = await sql`SELECT 1 as test, now() as timestamp`;
    console.log('✅ Database connection successful');
    console.log(`   → Connected at: ${result[0].timestamp}`);
    return true;
  } catch (error) {
    console.log('❌ Database connection failed:', error.message);
    return false;
  }
}

async function testDatabaseSchema() {
  console.log('🔍 Verifying database schema...');

  try {
    const sql = getDb();

    // Check if waitlist table exists with expected columns
    const tables = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'waitlist'
      ORDER BY ordinal_position
    `;

    if (tables.length === 0) {
      console.log('❌ Waitlist table not found');
      return false;
    }

    const requiredColumns = [
      'id', 'email', 'name', 'referral_code', 'referred_by',
      'referral_count', 'position', 'source', 'utm_source',
      'utm_medium', 'utm_campaign', 'status', 'created_at'
    ];

    const existingColumns = tables.map(col => col.column_name);
    const missingColumns = requiredColumns.filter(col => !existingColumns.includes(col));

    if (missingColumns.length > 0) {
      console.log(`❌ Missing columns in waitlist table: ${missingColumns.join(', ')}`);
      return false;
    }

    console.log(`✅ Schema verified - waitlist table has ${tables.length} columns`);
    return true;
  } catch (error) {
    console.log('❌ Schema verification failed:', error.message);
    return false;
  }
}

async function testWaitlistAPI() {
  console.log('🔍 Testing waitlist API endpoint...');

  const testEmail = `test-${Date.now()}@senhorio.test`;
  const testData = {
    email: testEmail,
    name: 'Test User',
    utm_source: 'test',
    utm_medium: 'script',
    utm_campaign: 'verification'
  };

  try {
    // Test with localhost first if DATABASE_URL is set locally
    let apiUrl = 'http://localhost:3000/api/waitlist';
    let testLocal = false;

    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('placeholder')) {
      try {
        console.log('   → Testing local API...');
        const localTest = await makeHttpRequest(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testData)
        });

        if (localTest.status === 200 && localTest.data.ok) {
          console.log('✅ Local API test successful');
          console.log(`   → Position: #${localTest.data.position}`);
          console.log(`   → Referral code: ${localTest.data.referral_code}`);
          testLocal = true;
        }
      } catch (e) {
        // Local test failed, will test production
      }
    }

    if (!testLocal) {
      console.log('   → Testing production API...');
      apiUrl = 'https://senhorio.vercel.app/api/waitlist';

      const response = await makeHttpRequest(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });

      if (response.status === 200 && response.data && response.data.ok) {
        console.log('✅ Production API test successful');
        console.log(`   → Position: #${response.data.position}`);
        console.log(`   → Referral code: ${response.data.referral_code}`);
      } else {
        console.log('❌ API test failed');
        console.log(`   → Status: ${response.status}`);
        console.log(`   → Response:`, response.data || response.raw);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.log('❌ API test failed:', error.message);
    return false;
  }
}

async function checkWaitlistStats() {
  console.log('📊 Checking waitlist statistics...');

  try {
    const sql = getDb();

    const stats = await sql`
      SELECT
        COUNT(*) as total_signups,
        COUNT(CASE WHEN status = 'waiting' THEN 1 END) as waiting,
        COUNT(CASE WHEN status = 'converted' THEN 1 END) as converted,
        COUNT(CASE WHEN source = 'referral' THEN 1 END) as referrals,
        MAX(position) as max_position,
        MAX(created_at) as last_signup
      FROM waitlist
    `;

    const stat = stats[0];
    console.log(`   → Total signups: ${stat.total_signups}`);
    console.log(`   → Currently waiting: ${stat.waiting}`);
    console.log(`   → Converted: ${stat.converted}`);
    console.log(`   → From referrals: ${stat.referrals}`);
    console.log(`   → Max position: ${stat.max_position || 'N/A'}`);
    console.log(`   → Last signup: ${stat.last_signup || 'N/A'}`);

    return true;
  } catch (error) {
    console.log('❌ Stats check failed:', error.message);
    return false;
  }
}

async function verifyEmailSequences() {
  console.log('📧 Checking email sequences...');

  try {
    const sql = getDb();

    const sequences = await sql`
      SELECT sequence, step, subject, is_active, send_count
      FROM email_sequences
      WHERE sequence = 'waitlist_welcome'
      ORDER BY step
    `;

    if (sequences.length === 0) {
      console.log('⚠️  No email sequences found - welcome emails not configured');
      console.log('   → This is not critical, but welcome emails won\'t be sent');
      return true;
    }

    console.log(`✅ Found ${sequences.length} email sequence(s)`);
    sequences.forEach(seq => {
      console.log(`   → Step ${seq.step}: "${seq.subject}" (sent ${seq.send_count} times, active: ${seq.is_active})`);
    });

    return true;
  } catch (error) {
    console.log('❌ Email sequence check failed:', error.message);
    return false;
  }
}

async function runVerification() {
  console.log('🚀 Verifying Senhorio waitlist functionality...\n');

  const tests = [
    { name: 'Database Connection', fn: testDatabaseConnection },
    { name: 'Database Schema', fn: testDatabaseSchema },
    { name: 'Waitlist Statistics', fn: checkWaitlistStats },
    { name: 'Email Sequences', fn: verifyEmailSequences },
    { name: 'API Endpoint', fn: testWaitlistAPI }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${test.name} failed with error:`, error.message);
      failed++;
    }
    console.log(''); // Add spacing
  }

  console.log('📋 Verification Summary:');
  console.log(`   ✅ Passed: ${passed}`);
  console.log(`   ❌ Failed: ${failed}`);

  if (failed === 0) {
    console.log('\n🎉 All tests passed! Waitlist is ready to capture leads.');
    console.log('💡 Next steps:');
    console.log('   1. Monitor signups at https://senhorio.vercel.app');
    console.log('   2. Check Neon dashboard for database activity');
    console.log('   3. Consider setting up email sequences for better engagement');
  } else {
    console.log('\n⚠️  Some tests failed. Please fix the issues before going live.');
    console.log('💡 Common issues:');
    console.log('   - DATABASE_URL still contains placeholder values');
    console.log('   - Database schema not applied (run: node scripts/setup-database.js)');
    console.log('   - Vercel environment variables not updated');
  }
}

if (require.main === module) {
  runVerification().catch(console.error);
}

module.exports = { runVerification };