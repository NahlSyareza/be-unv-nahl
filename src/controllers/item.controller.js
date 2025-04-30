const itemRepo = require("../repositories/item.repository");
const baseRes = require("../utils/baseResponse.util");
const spsTitan = require("../utils/imageUpload.util");

exports.createItem = async (req, res) => {
  try {
    const createItem = await itemRepo.createItem(req.body, req.file);

    switch (createItem) {
      case "storeNotFoundErr":
        return baseRes(res, false, 200, "Store not found", null);

      case "blankFieldErr":
        return baseRes(res, false, 400, "You must fill all fields!", null);

      default:
        return baseRes(res, true, 200, "Item created", createItem);
    }
  } catch (e) {
    return baseRes(res, false, 500, `Error: ${e.message}`, null);
  }
};

exports.getAllItem = async (req, res) => {
  try {
    const getAllItem = await itemRepo.getAllItem();

    return baseRes(res, true, 200, "Items found", getAllItem);
  } catch (e) {
    return baseRes(res, false, 500, `Error: ${e.message}`, null);
  }
};

exports.getItemById = async (req, res) => {
  try {
    const getItemById = await itemRepo.getItemById(req.params);

    switch (getItemById) {
      case "itemNotFoundErr":
        return baseRes(res, true, 200, "Item not found", null);

      default:
        return baseRes(res, true, 200, "Item found", getItemById);
    }
  } catch (e) {
    return baseRes(res, false, 500, `Error: ${e.message}`, null);
  }
};

exports.getItemsByStoreId = async (req, res) => {
  try {
    const getItemsByStoreId = await itemRepo.getItemsByStoreId(req.params);

    switch (getItemsByStoreId) {
      case "storeNotFoundErr":
        return baseRes(res, true, 200, "Store doesn't exist", null);

      default:
        return baseRes(res, true, 200, "Items found", getItemsByStoreId);
    }
  } catch (e) {
    return baseRes(res, false, 500, `Error: ${e.message}`, null);
  }
};

exports.updateItem = async (req, res) => {
  try {
    const updateItem = await itemRepo.updateItem(req.body, req.file);

    switch (updateItem) {
      case "storeNotFoundErr":
        return baseRes(res, true, 200, "Store doesn't exist", null);

      case "blankFieldErr":
        return baseRes(res, false, 400, "You must fill all fields!", null);

      case "itemNotFoundErr":
        return baseRes(res, false, 200, "Item doesn't exist!", null);

      default:
        return baseRes(res, true, 200, "Item updated", updateItem);
    }
  } catch (e) {
    return baseRes(res, false, 500, `Error: ${e.message}`, null);
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const deleteItem = await itemRepo.deleteItem(req.params);

    switch (deleteItem) {
      case "itemNotFoundErr":
        return baseRes(res, false, 200, "Item doesn't exist!", null);

      default:
        baseRes(res, true, 200, "Item deleted", deleteItem);
    }
  } catch (e) {
    return baseRes(res, false, 500, `Error: ${e.message}`, null);
  }
};
