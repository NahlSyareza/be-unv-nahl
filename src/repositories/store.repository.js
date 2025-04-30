const db = require("../database/pg.database");

exports.getAllStores = async () => {
  let client;
  try {
    client = await db.pool.connect();

    const res = await client.query("SELECT * FROM stores");
    return res.rows;
  } catch (e) {
    return e.message;
  }
};

exports.createStore = async (store) => {
  let client;
  try {
    client = await db.pool.connect();

    const res = await client.query(
      "INSERT INTO stores (name, address) VALUES ($1,$2) RETURNING *",
      [store.name, store.address]
    );

    return res.rows;
  } catch (e) {
    return e.message;
  }
};

exports.getStore = async (data) => {
  let client;
  try {
    client = await db.pool.connect();

    const res = await client.query("SELECT * FROM stores WHERE id=$1", [
      data.id,
    ]);

    return res;
  } catch (e) {
    return e.message;
  }
};

exports.updateStore = async (data) => {
  let client;
  try {
    client = await db.pool.connect();

    const res = await client.query(
      "UPDATE stores SET name=$1, address=$2 WHERE id=$3 RETURNING *",
      [data.name, data.address, data.id]
    );

    return res;
  } catch (e) {
    return e.message;
  }
};

exports.deleteStore = async (data) => {
  let client;
  try {
    client = await db.pool.connect();

    const res = await client.query(
      "DELETE FROM stores WHERE id=$1 RETURNING *",
      [data.id]
    );

    return res;
  } catch (e) {
    return e.message;
  }
};
