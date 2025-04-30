const storeRepo = require("../repositories/store.repository");
const baseRes = require("../../src/utils/baseResponse.util");

exports.getAllStores = async (req, res) => {
  try {
    const stores = await storeRepo.getAllStores();
    baseRes(res, true, 200, "Stores retrieved!", stores);
  } catch (e) {
    baseRes(res, false, 500, `Error: ${e.message}`, e);
  }
};

exports.createStore = async (req, res) => {
  if (!req.body.name || !req.body.address) {
    return baseRes(res, false, 400, "Field name or address is missing!", null);
  }

  try {
    const createStore = await storeRepo.createStore(req.body);
    baseRes(res, true, 201, "Store created!", createStore);
  } catch (e) {
    baseRes(res, false, 500, `Error: ${e.message}`, null);
  }
};

exports.getStore = async (req, res) => {
  try {
    const getStore = await storeRepo.getStore(req.params);

    if (getStore.rowCount < 1) {
      return baseRes(res, false, 200, "Store not found!", null);
    } else {
      return baseRes(res, true, 200, "Store found!", getStore.rows);
    }
  } catch (e) {
    baseRes(res, false, 500, `Error: ${e.message}`, null);
  }
};

exports.updateStore = async (req, res) => {
  if (!req.body.id || !req.body.name || !req.body.address) {
    return baseRes(res, false, 400, "Blank id, name, or address fields", null);
  }

  try {
    const updateStore = await storeRepo.updateStore(req.body);

    if (updateStore.rowCount < 1) {
      return baseRes(res, false, 200, "Store not found", null);
    } else {
      return baseRes(res, true, 201, "Store updated", updateStore.rows);
    }
  } catch (e) {
    return baseRes(res, false, 500, `Error: ${e.message}`), null;
  }
};

exports.deleteStore = async (req, res) => {
  try {
    const deleteStore = await storeRepo.deleteStore(req.params);

    if (deleteStore.rowCount < 1) {
      return baseRes(res, false, 200, "Store not found!", null);
    } else {
      return baseRes(res, true, 201, "Store deleted", deleteStore.rows);
    }
  } catch (e) {
    return baseRes(res, false, 500, `Error: ${e.message}`), null;
  }
};

exports.debug = async (req, res) => {
  try {
    console.log(req.body.store.address);

    return res.status(200).json({
      value: req.body.store.address,
    });
  } catch (e) {
    // return baseRes(res, false, 500, `Error: ${e.message}`, null);
  }
};
