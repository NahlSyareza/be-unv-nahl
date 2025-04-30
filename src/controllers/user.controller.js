const { register } = require("module");
const userRepo = require("../repositories/user.repository");
const baseRes = require("../../src/utils/baseResponse.util");

exports.registerUser = async (req, res) => {
  try {
    const registerUser = await userRepo.registerUser(req.query);
    if (!registerUser) {
      return baseRes(res, false, 400, "Email already exist!", null);
    }

    switch (registerUser) {
      case "emailRegexErr":
        return baseRes(res, false, 400, "Email not recognized!", null);

      case "passwordRegexErr":
        return baseRes(
          res,
          false,
          400,
          "Password length must be at least 8, includes 1 number, and 1 special character!",
          null
        );

      default:
        return baseRes(res, true, 200, "User created!", registerUser.rows);
    }
  } catch (e) {
    return baseRes(res, false, 500, `Error: ${e.message}`, null);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const loginUser = await userRepo.loginUser(req.query);
    if (!loginUser) {
      return baseRes(res, false, 200, "Invalid username or password!", null);
    } else {
      return baseRes(res, true, 201, "Login successful", loginUser);
    }
  } catch (e) {
    return baseRes(res, false, 500, `Error: ${e.message}`, null);
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const getUserByEmail = await userRepo.getUserByEmail(req.params);
    if (getUserByEmail.rowCount < 1) {
      return baseRes(res, false, 200, "User not found!", null);
    } else {
      return baseRes(res, true, 200, "User found!", getUserByEmail.rows);
    }
  } catch (e) {
    return baseRes(res, false, 500, `Error: ${e.message}`, null);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updateUser = await userRepo.updateUser(req.body);

    if (updateUser.rowCount < 1) {
      return baseRes(res, false, 200, "User not found", null);
    }

    switch (updateUser) {
      case "emailRegexErr":
        return baseRes(res, false, 400, "Email not recognized!", null);

      case "passwordRegexErr":
        return baseRes(
          res,
          false,
          400,
          "Password length must be at least 8, includes 1 number, and 1 special character!",
          null
        );

      default:
        return baseRes(res, true, 200, "User updated!", updateUser.rows);
    }
  } catch (e) {
    return baseRes(res, false, 500, `Error: ${e.message}`, null);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await userRepo.deleteUser(req.params);

    if (deleteUser.rowCount < 1) {
      return baseRes(res, false, 200, "User not found!", null);
    } else {
      return baseRes(res, true, 200, "User deleted!", deleteUser.rows);
    }
  } catch (e) {
    return baseRes(res, false, 500, `Error: ${e.message}`, null);
  }
};

exports.topUpUser = async (req, res) => {
  try {
    const topUpUser = await userRepo.topUpUser(req.query);

    switch (topUpUser) {
      case "blankFieldsErr":
        return baseRes(res, false, 400, "You must fill all fields!", null);

      case "zeroAmountErr":
        return baseRes(res, false, 400, "Amount must be larger than 0", null);

      case "userNotFoundErr":
        return baseRes(res, false, 200, "User not found!", null);

      default:
        return baseRes(res, true, 200, "Top up successful!", topUpUser);
    }
  } catch (e) {
    return baseRes(res, false, 500, `Error: ${e.message}`, null);
  }
};
