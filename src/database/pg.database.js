require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

const connect = async () => {
  try {
    await pool.connect();
    console.log("Connected to database!");
  } catch (e) {
    console.error(`Error connecting to database with message: ${e}`);
  }
};

connect();

const query = async (text, params) => {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (e) {
    console.error(`Error executing query with message: ${e}`);
  }
};

module.exports = {
  query,
  pool,
};
