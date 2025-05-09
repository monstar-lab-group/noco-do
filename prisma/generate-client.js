const fs = require('fs');
const { execSync } = require('child_process');

if (!process.env.DATABASE_PROVIDER || !process.env.DATABASE_URL) {
  console.log('Environment variables not set, using defaults from default.env');
  
  const defaultEnv = fs.readFileSync('./prisma/default.env', 'utf8');
  const envVars = defaultEnv.split('\n')
    .filter(line => line && !line.startsWith('#'))
    .map(line => line.split('='));
  
  envVars.forEach(([key, value]) => {
    if (key && value && !process.env[key]) {
      process.env[key] = value;
      console.log(`Setting ${key}=${value}`);
    }
  });
}

console.log('Generating Prisma client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('Prisma client generated successfully');
} catch (error) {
  console.error('Error generating Prisma client:', error);
  process.exit(1);
}
