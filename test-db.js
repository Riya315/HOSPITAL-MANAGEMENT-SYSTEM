require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');

async function test() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'hospital_hms',
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : null
    });
    console.log("✅ Successfully connected to database:", process.env.DB_NAME || 'hospital_hms');
    
    const [triggers] = await connection.execute('SHOW TRIGGERS');
    console.log("Triggers:", triggers);
    
    await connection.end();
  } catch (err) {
    console.error("Connection failed:", err.message);
  }
}

test();
