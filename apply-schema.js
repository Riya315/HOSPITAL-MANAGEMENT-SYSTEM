const mysql = require('mysql2/promise');
const fs = require('fs');

async function runSchema() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'student',
      multipleStatements: true
    });
    
    const sql = fs.readFileSync('schema.sql', 'utf8');
    console.log("Running schema.sql...");
    await connection.query(sql);
    console.log("Schema applied successfully!");
    await connection.end();
  } catch (err) {
    console.error("Failed to run schema:", err.message);
  }
}

runSchema();
