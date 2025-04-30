const transactRepo = require("../repositories/transaction.repository");
const baseRes = require("../../src/utils/baseResponse.util");

exports.createTransaction = async (req, res) => {
  try {
    const createTransaction = await transactRepo.createTransaction(req.body);

    switch (createTransaction) {
      case "zeroQuantityErr":
        return baseRes(res, false, 400, "Quantity must be larger than 0", null);

      case "blankFieldErr":
        return baseRes(res, false, 400, "All field must be filled!", null);

      case "itemNotFoundErr":
        return baseRes(
          res,
          false,
          200,
          "Item not found or quantity is too large!",
          null
        );

      default:
        return baseRes(res, true, 200, "Success!", createTransaction);
    }
  } catch (e) {
    return baseRes(res, false, 500, `Error: ${e.message}`), null;
  }
};

exports.payTransaction = async (req, res) => {
  try {
    const payTransaction = await transactRepo.payTransaction(req.params);

    switch (payTransaction) {
      case "blankFieldErr":
        return baseRes(res, false, 400, "All field must be filled!", null);

      case "transactionPaidErr":
        return baseRes(
          res,
          false,
          200,
          "This transaction has already been paid!",
          null
        );

      case "lowBalanceErr":
        return baseRes(res, false, 200, "User have low balance", null);

      default:
        return baseRes(res, true, 200, "Success", payTransaction);
    }
  } catch (e) {
    return baseRes(res, false, 500, `Error: ${e.message}`), null;
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const deleteTransaction = await transactRepo.deleteTransaction(req.params);

    switch (deleteTransaction) {
      case "transactionNotFoundErr":
        return baseRes(res, false, 200, "Transaction not found!", null);

      default:
        return baseRes(
          res,
          true,
          200,
          "Transaction deleted!",
          deleteTransaction
        );
    }
  } catch (e) {
    return baseRes(res, false, 500, `Error: ${e.message}`), null;
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const query = await transactRepo.getTransaction(req);

    return baseRes(res, true, 200, "Transactions received!", query.rows);
  } catch (e) {
    return baseRes(res, false, 500, `Error: ${e.message}`), null;
  }
};
