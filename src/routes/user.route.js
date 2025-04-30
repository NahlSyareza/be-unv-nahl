const userControl = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.post("/register", userControl.registerUser);
router.post("/login", userControl.loginUser);
router.get("/:email", userControl.getUserByEmail);
router.put("/", userControl.updateUser);
router.delete("/:id", userControl.deleteUser);
router.post("/topUp", userControl.topUpUser);

module.exports = router;
