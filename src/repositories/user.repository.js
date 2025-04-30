const db = require("../../src/database/pg.database");
const bcrypt = require("bcrypt");
const saltLength = 16;
const reggex = require("../../src/utils/regex.util");

exports.registerUser = async (data) => {
  let client;
  try {
    client = await db.pool.connect();

    const emailRegexRes = reggex.emailRegex(data.email);

    console.log(reggex.emailRegex(data.email));

    if (!emailRegexRes) {
      return "emailRegexErr";
    }

    const passwordRegexRes = reggex.passwordRegex(data.password);

    if (!passwordRegexRes) {
      return "passwordRegexErr";
    }

    const hashedPassword = await bcrypt.hash(data.password, saltLength);

    console.log(hashedPassword);

    const res = await client.query(
      "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *",
      [data.name, data.email, hashedPassword]
    );
    return res;
  } catch (e) {
    return e;
  }
};

exports.loginUser = async (data) => {
  let client;
  try {
    client = await db.pool.connect();

    const res = await client.query("SELECT * FROM users WHERE email=$1", [
      data.email,
    ]);

    const hashedPassword = res.rows[0].password;

    const isMatch = await bcrypt.compare(data.password, hashedPassword);
    console.log(isMatch);

    if (!isMatch) {
      return false;
    }

    return res.rows;
  } catch (e) {
    return e;
  }
};

exports.getUserByEmail = async (data) => {
  let client;
  try {
    client = await db.pool.connect();

    const res = await client.query("SELECT * FROM users WHERE email=$1", [
      data.email,
    ]);

    return res;
  } catch (e) {
    return e;
  }
};

exports.updateUser = async (data) => {
  let client;
  try {
    client = await db.pool.connect();

    const emailRegexRes = reggex.emailRegex(data.email);

    if (!emailRegexRes) {
      return "emailRegexErr";
    }

    const passwordRegexRes = reggex.passwordRegex(data.password);

    if (!passwordRegexRes) {
      return "passwordRegexErr";
    }

    const hashedPassword = await bcrypt.hash(data.password, saltLength);

    console.log(hashedPassword);

    const res = await client.query(
      "UPDATE users SET email=$1,name=$2,password=$3 WHERE id=$4 RETURNING *",
      [data.email, data.name, hashedPassword, data.id]
    );

    return res;
  } catch (e) {
    return e;
  }
};

exports.deleteUser = async (data) => {
  let client;
  try {
    client = await db.pool.connect();

    const res = await client.query(
      "DELETE FROM users WHERE id=$1 RETURNING *",
      [data.id]
    );

    return res;
  } catch (e) {
    return e;
  }
};

exports.topUpUser = async (req) => {
  let client;
  try {
    client = await db.pool.connect();

    if (!req.amount || !req.id) {
      return "blankFieldsErr";
    }

    if (req.amount <= 0) {
      return "zeroAmountErr";
    }

    const res = await client.query(
      "UPDATE users SET balance=balance+$1 WHERE id=$2 RETURNING *",
      [req.amount, req.id]
    );

    if (res.rowCount < 1) {
      return "userNotFoundErr";
    }

    return res.rows;
  } catch (e) {
    return e;
  }
};
