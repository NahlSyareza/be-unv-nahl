const db = require("../../src/database/pg.database");
const imgUp = require("../../src/utils/imageUpload.util");

exports.createItem = async (req, img) => {
  let client;
  try {
    client = await db.pool.connect();

    const findStore = await client.query("SELECT * FROM stores WHERE id=$1", [
      req.store_id,
    ]);

    // console.log(req.store_id);
    // console.log(findStore.rowCount);

    if (findStore.rowCount < 1) {
      return "storeNotFoundErr";
    }

    if (!req.name || !req.price || !req.stock || !img) {
      return "blankFieldErr";
    }

    console.log(img);
    console.log(img.path);

    const upRes = await imgUp.uploadResult(img);

    // console.log(upRes);

    const createItem = await client.query(
      "INSERT INTO items (name, price, store_id, image_url, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [req.name, req.price, req.store_id, upRes.secure_url, req.stock]
    );

    return createItem.rows;
  } catch (e) {
    return e;
  } finally {
    if (client) {
      client.release();
    }
  }
};

exports.getAllItem = async () => {
  let client;
  try {
    client = await db.pool.connect();

    const res = await client.query("SELECT * FROM items");

    return res.rows;
  } catch (e) {
    return e;
  }
};

exports.getItemById = async (req) => {
  let client;
  try {
    client = await db.pool.connect();

    const res = await client.query("SELECT * FROM items WHERE id=$1", [req.id]);

    if (res.rowCount < 1) {
      return "itemNotFoundErr";
    }

    return res.rows;
  } catch (e) {
    return e;
  }
};

exports.getItemsByStoreId = async (req) => {
  let client;
  try {
    client = await db.pool.connect();

    const res = await client.query("SELECT * FROM items WHERE store_id=$1", [
      req.store_id,
    ]);

    console.log(res.rowCount);

    if (res.rowCount < 1) {
      return "storeNotFoundErr";
    }

    return res.rows;
  } catch (e) {
    return e;
  }
};

exports.updateItem = async (req, img) => {
  let client;
  try {
    client = await db.pool.connect();

    const findStore = await client.query("SELECT * FROM stores WHERE id=$1", [
      req.store_id,
    ]);

    if (findStore.rowCount < 1) {
      return "storeNotFoundErr";
    }

    if (!req.id || !req.name || !req.price || !req.stock || !img) {
      return "blankFieldErr";
    }

    const upRes = await imgUp.uploadResult(img);

    console.log(upRes.secure_url);

    const updateItem = await client.query(
      "UPDATE items SET name=$1,price=$2,stock=$3,image_url=$4 WHERE id=$5 RETURNING *",
      [req.name, req.price, req.stock, upRes.secure_url, req.id]
    );

    if (updateItem.rowCount < 1) {
      return "itemNotFoundErr";
    }

    return updateItem.rows;
  } catch (e) {
    return e;
  }
};

exports.deleteItem = async (req) => {
  let client;
  try {
    client = await db.pool.connect();

    const res = await client.query(
      "DELETE FROM items WHERE id=$1 RETURNING *",
      [req.id]
    );

    if (res.rowCount < 1) {
      return "itemNotFoundErr";
    }

    return res.rows;
  } catch (e) {
    return e;
  }
};
