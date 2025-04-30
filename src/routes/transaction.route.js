const transactControl = require("../controllers/transaction.controller");
const express = require("express");
const router = express.Router();

router.post("/create", transactControl.createTransaction);
router.post("/pay/:id", transactControl.payTransaction);
router.delete("/:id", transactControl.deleteTransaction);
router.get("/", transactControl.getTransaction);

module.exports = router;
