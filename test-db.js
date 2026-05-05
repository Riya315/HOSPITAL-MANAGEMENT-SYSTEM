const mysql = require('mysql2/promise');

async function test() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'student',
      database: 'HOSPITAL_HMS'
    });
    console.log("Connected!");
    
    const [triggers] = await connection.execute('SHOW TRIGGERS');
    console.log("Triggers:", triggers);
    
    await connection.end();
  } catch (err) {
    console.error("Connection failed:", err.message);
  }
}

test();
