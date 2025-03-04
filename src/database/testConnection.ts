import db from '.';

async function testConnection() {
  try {
    await db.raw('SELECT 1+1 AS result');
    console.log('Database connection successful!');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

testConnection();
