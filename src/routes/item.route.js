const itemControl = require("../controllers/item.controller");
const express = require("express");
const router = express.Router();

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/create", upload.single("image"), itemControl.createItem);
router.get("/", itemControl.getAllItem);
router.get("/byId/:id", itemControl.getItemById);
router.get("/byStoreId/:store_id", itemControl.getItemsByStoreId);
router.put("/", upload.single("image"), itemControl.updateItem);
router.delete("/:id", itemControl.deleteItem);

module.exports = router;
