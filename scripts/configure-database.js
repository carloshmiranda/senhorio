#!/usr/bin/env node
/**
 * Configure Senhorio database with schema isolation
 * Alternative approach using existing Neon project with dedicated schema
 */

const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function configureDatabase() {
  console.log('🏗️  Configuring Senhorio database with schema isolation...\n');

  // For the schema-based approach, we need a connection string that sets the search_path
  // This ensures isolation within an existing Neon project
  const NEON_HOST = 'ep-dawn-lab-00000000.us-west-2.aws.neon.tech'; // This will be replaced with actual host
  const schemaBasedUrl = `postgresql://senhorio_user:senhorio_pass@${NEON_HOST}/hive?sslmode=require&options=-c%20search_path%3Dsenhorio,public`;

  console.log('📋 Database configuration strategy:');
  console.log('✅ Schema-based isolation (recommended)');
  console.log('✅ Use existing Neon project with dedicated schema');
  console.log('✅ Connection string sets search_path to senhorio schema\n');

  console.log('🔧 Manual setup required:');
  console.log('1. Connect to your existing Neon project:');
  console.log('   psql "postgresql://user:pass@host/database?sslmode=require"');
  console.log('');
  console.log('2. Create the senhorio schema:');
  console.log('   CREATE SCHEMA IF NOT EXISTS senhorio;');
  console.log('   GRANT ALL ON SCHEMA senhorio TO your_user;');
  console.log('');
  console.log('3. Create a connection string with schema isolation:');
  console.log('   postgresql://user:pass@host/database?sslmode=require&options=-c%20search_path%3Dsenhorio,public');
  console.log('');
  console.log('4. Update the DATABASE_URL in Vercel with the schema-specific connection string');
  console.log('');
  console.log('5. Run the provision script to apply the schema:');
  console.log('   npm run setup-db');
  console.log('');

  // Check if we can configure via Vercel API
  if (process.env.VERCEL_TOKEN) {
    console.log('🔐 VERCEL_TOKEN detected, checking current configuration...\n');
    await checkVercelConfig();
  } else {
    console.log('⚠️  VERCEL_TOKEN not available for automatic configuration');
  }

  console.log('📖 Once configured, test with:');
  console.log('   curl https://senhorio.vercel.app/api/health');
  console.log('   # Should return: {"ok": true, "data": {"status": "healthy", "database": "connected"}}');
}

async function checkVercelConfig() {
  try {
    const { stdout } = await execPromise(
      'curl -s "https://api.vercel.com/v10/projects/senhorio/env" -H "Authorization: Bearer $VERCEL_TOKEN"'
    );

    const config = JSON.parse(stdout);
    const databaseEnv = config.envs?.find(env => env.key === 'DATABASE_URL');

    if (databaseEnv) {
      console.log('✅ DATABASE_URL found in Vercel:');
      const isPlaceholder = databaseEnv.value.includes('placeholder');
      if (isPlaceholder) {
        console.log('   ⚠️  Currently set to placeholder value');
        console.log('   🔧 Needs to be updated with real Neon connection string');
      } else {
        console.log('   ✅ Real connection string detected');
        console.log('   📍 Testing connection recommended');
      }
    } else {
      console.log('❌ DATABASE_URL not found in Vercel configuration');
    }

  } catch (error) {
    console.error('❌ Error checking Vercel configuration:', error.message);
  }
}

async function updateVercelDatabaseUrl(connectionString) {
  if (!process.env.VERCEL_TOKEN) {
    throw new Error('VERCEL_TOKEN required for automatic configuration');
  }

  console.log('🔄 Updating DATABASE_URL in Vercel...');

  try {
    // First, delete the existing DATABASE_URL
    const { stdout: envList } = await execPromise(
      'curl -s "https://api.vercel.com/v10/projects/senhorio/env" -H "Authorization: Bearer $VERCEL_TOKEN"'
    );

    const config = JSON.parse(envList);
    const existingEnv = config.envs?.find(env => env.key === 'DATABASE_URL');

    if (existingEnv) {
      await execPromise(
        `curl -s -X DELETE "https://api.vercel.com/v10/projects/senhorio/env/${existingEnv.id}" -H "Authorization: Bearer $VERCEL_TOKEN"`
      );
      console.log('🗑️  Removed existing DATABASE_URL');
    }

    // Add the new DATABASE_URL
    const payload = {
      key: 'DATABASE_URL',
      value: connectionString,
      target: ['production', 'preview', 'development'],
      type: 'encrypted'
    };

    await execPromise(
      `curl -s -X POST "https://api.vercel.com/v10/projects/senhorio/env" -H "Authorization: Bearer $VERCEL_TOKEN" -H "Content-Type: application/json" -d '${JSON.stringify(payload)}'`
    );

    console.log('✅ DATABASE_URL updated in Vercel');
    console.log('🔄 Redeploy required to apply changes');

  } catch (error) {
    console.error('❌ Error updating Vercel configuration:', error.message);
    throw error;
  }
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args[0] === 'update' && args[1]) {
    // Update DATABASE_URL with provided connection string
    updateVercelDatabaseUrl(args[1])
      .then(() => console.log('✅ Configuration updated'))
      .catch(error => {
        console.error('❌ Configuration failed:', error.message);
        process.exit(1);
      });
  } else {
    // Show configuration instructions
    configureDatabase().catch(error => {
      console.error('❌ Configuration error:', error.message);
      process.exit(1);
    });
  }
}

module.exports = { configureDatabase, updateVercelDatabaseUrl };