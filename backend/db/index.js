const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    password: ,
    host: "localhost",
    port: "5000",
    database: "tutorial",
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0
});

module.exports = {
  async query(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("Executed query:", { text, duration, rows: res.rowCount });
    return res;
  }
};
