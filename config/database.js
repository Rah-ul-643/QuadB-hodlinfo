const { Pool } = require('pg');

const dbpassword= process.env.DBPASS;


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hodlinfo',
  password: dbpassword,
  port: 5432, // Default PostgreSQL port
});

module.exports= pool;