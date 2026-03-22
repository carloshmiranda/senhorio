#!/usr/bin/env node
/**
 * Neon database provisioning for Senhorio
 *
 * This script automates the creation of the Neon database and configuration
 * Run with: node scripts/provision-neon.js
 */

const https = require('https');
const { setupDatabase } = require('./setup-database.js');

// Neon API settings
const NEON_API_BASE = 'https://console.neon.tech/api/v2';
const PROJECT_NAME = 'senhorio';
const DATABASE_NAME = 'senhorio';
const REGION = 'aws-eu-central-1'; // Frankfurt - closest to Portugal

async function makeRequest(method, url, data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = https.request(url, options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          const parsed = responseData ? JSON.parse(responseData) : {};
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${parsed.message || responseData}`));
          }
        } catch (e) {
          reject(new Error(`Invalid JSON response: ${responseData}`));
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function createNeonDatabase() {
  console.log('🏗️  Provisioning Neon database for Senhorio...\n');

  // Check for Neon API key
  const neonApiKey = process.env.NEON_API_KEY;
  if (!neonApiKey) {
    console.log('❌ NEON_API_KEY environment variable not found.\n');
    console.log('To provision the database automatically, you need a Neon API key:\n');
    console.log('1. Go to https://console.neon.tech/app/settings/api-keys');
    console.log('2. Create a new API key');
    console.log('3. Set NEON_API_KEY environment variable\n');
    console.log('Alternatively, follow the manual setup instructions below:\n');
    showManualInstructions();
    return;
  }

  try {
    const headers = { Authorization: `Bearer ${neonApiKey}` };

    console.log('📍 Creating Neon project...');
    const project = await makeRequest('POST', `${NEON_API_BASE}/projects`, {
      name: PROJECT_NAME,
      region_id: REGION,
      settings: {
        quota: {
          active_time_seconds: 300, // 5 min - suitable for free tier
          compute_time_seconds: 3600 // 1 hour
        }
      }
    }, headers);

    console.log(`✅ Project created: ${project.project.id}`);

    // Wait a moment for the project to be ready
    console.log('⏳ Waiting for project initialization...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('📍 Getting connection details...');
    const connectionDetails = await makeRequest('GET',
      `${NEON_API_BASE}/projects/${project.project.id}/connection_uri`,
      null,
      headers
    );

    const databaseUrl = connectionDetails.uri;
    console.log('✅ Database URL obtained');

    // Set the DATABASE_URL in Vercel
    console.log('📍 Updating Vercel environment variable...');
    const vercelToken = process.env.VERCEL_TOKEN;
    if (!vercelToken) {
      console.log('❌ VERCEL_TOKEN not found. Please set DATABASE_URL manually.');
      console.log(`DATABASE_URL=${databaseUrl}`);
      return;
    }

    await makeRequest('POST', 'https://api.vercel.com/v10/projects/senhorio/env', {
      key: 'DATABASE_URL',
      value: databaseUrl,
      target: ['production', 'preview', 'development'],
      type: 'encrypted'
    }, { Authorization: `Bearer ${vercelToken}` });

    console.log('✅ Vercel environment variable updated');

    // Test the connection and apply schema
    console.log('📍 Testing database connection and applying schema...');
    process.env.DATABASE_URL = databaseUrl;
    await setupDatabase();

    console.log('\n🎉 Database provisioning complete!');
    console.log('📍 Next steps:');
    console.log('1. Commit and push your changes');
    console.log('2. Deploy to Vercel (it will use the new DATABASE_URL)');
    console.log('3. Test the waitlist form on the live site');
    console.log(`\n💡 Database URL (keep this secure): ${databaseUrl}`);

  } catch (error) {
    console.error('❌ Error during provisioning:', error.message);
    console.log('\nFalling back to manual instructions:\n');
    showManualInstructions();
  }
}

function showManualInstructions() {
  console.log('🔧 Manual Database Setup Instructions:');
  console.log('=====================================\n');

  console.log('1. Create Neon Project:');
  console.log('   → Go to https://console.neon.tech');
  console.log('   → Click "Create Project"');
  console.log('   → Name: senhorio');
  console.log('   → Region: AWS Europe (eu-central-1) Frankfurt');
  console.log('   → Click "Create Project"\n');

  console.log('2. Get Database URL:');
  console.log('   → In the Neon dashboard, go to the "Connection Details" tab');
  console.log('   → Copy the connection string (starts with postgresql://)\n');

  console.log('3. Update Vercel Environment Variable:');
  console.log('   → Go to https://vercel.com/carloshmiranda/senhorio/settings/environment-variables');
  console.log('   → Find the existing DATABASE_URL variable');
  console.log('   → Click "Edit" and replace the placeholder with your real connection string');
  console.log('   → Make sure it targets Production, Preview, and Development');
  console.log('   → Click "Save"\n');

  console.log('4. Apply Database Schema:');
  console.log('   → Set the DATABASE_URL locally: export DATABASE_URL="your_neon_connection_string"');
  console.log('   → Run: node scripts/setup-database.js');
  console.log('   → This will create all required tables\n');

  console.log('5. Deploy:');
  console.log('   → Push your code to main branch or trigger a Vercel redeploy');
  console.log('   → The site will now use the real database\n');

  console.log('6. Test:');
  console.log('   → Visit https://senhorio.vercel.app');
  console.log('   → Try signing up for the waitlist');
  console.log('   → Check the Neon dashboard to see if data was inserted\n');

  console.log('💡 Database Requirements:');
  console.log('   → PostgreSQL 13+ (Neon provides this)');
  console.log('   → SSL connection (required for Vercel)');
  console.log('   → Connection pooling (Neon provides this)');
}

if (require.main === module) {
  createNeonDatabase().catch(console.error);
}

module.exports = { createNeonDatabase, showManualInstructions };