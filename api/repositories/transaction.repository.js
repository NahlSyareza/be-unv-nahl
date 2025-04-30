const db = require("../database/pg.database");

exports.createTransaction = async (req) => {
  let client;
  try {
    client = await db.pool.connect();
    // If ini dengan if di bawahnya beririsan karena quantity = 0 sama aja kea !quantity. Jadi gw lebih memprioritaskan if yg ini.
    if (req.quantity <= 0) {
      return "zeroQuantityErr";
    }

    if (!req.item_id || !req.quantity || !req.user_id) {
      return "blankFieldErr";
    }

    const itemRes = await client.query(
      "SELECT * FROM items WHERE id=$1 AND stock>=$2",
      [req.item_id, req.quantity]
    );

    if (itemRes.rowCount < 1) {
      return "itemNotFoundErr";
    }

    const total = itemRes.rows[0].price * req.quantity;

    console.log(total);

    const transactRes = await client.query(
      "INSERT INTO transactions (user_id, item_id, quantity, total) VALUES ($1,$2,$3,$4) RETURNING *",
      [req.user_id, req.item_id, req.quantity, total]
    );

    return transactRes.rows;
  } catch (e) {
    return e;
  }
};

exports.payTransaction = async (req) => {
  let client;
  try {
    client = await db.pool.connect();

    if (!req.id) {
      return "blankFieldErr";
    }

    const transactRes = await client.query(
      "SELECT * FROM transactions WHERE id=$1",
      [req.id]
    );

    const transactStatus = transactRes.rows[0].status;

    if (transactStatus == "paid") {
      return "transactionPaidErr";
    }

    const userId = transactRes.rows[0].user_id;
    const itemId = transactRes.rows[0].item_id;

    const userRes = await client.query("SELECT * FROM users WHERE id=$1", [
      userId,
    ]);

    const transactTotal = transactRes.rows[0].total;
    const userBal = userRes.rows[0].balance;

    if (transactTotal > userBal) {
      return "lowBalanceErr";
    }

    const updateTransact = await client.query(
      "UPDATE transactions SET status='paid' WHERE id=$1 RETURNING *",
      [req.id]
    );

    const updateUser = await client.query(
      "UPDATE users SET balance=balance-$1 WHERE id=$2 RETURNING *",
      [transactTotal, userId]
    );

    const transactQuantity = transactRes.rows[0].quantity;

    const updateItem = await client.query(
      "UPDATE items SET stock=stock-$1 WHERE id=$2 RETURNING *",
      [transactQuantity, itemId]
    );

    return updateTransact.rows;
  } catch (e) {
    return e;
  }
};

exports.deleteTransaction = async (req) => {
  let client;
  try {
    client = await db.pool.connect();

    if (!req.id) {
      return "blankFieldErr";
    }

    const res = await client.query(
      "DELETE FROM transactions WHERE id=$1 RETURNING *",
      [req.id]
    );

    if (res.rowCount < 1) {
      return "transactionNotFoundErr";
    }

    return res.rows;
  } catch (e) {
    return e;
  }
};

exports.getTransaction = async (req) => {
  let client;
  try {
    client = await db.pool.connect();

    const res = await client.query("SELECT * FROM transactions");

    return res;
  } catch (e) {
    return e;
  } finally {
    if (client) {
      client.release();
    }
  }
};
