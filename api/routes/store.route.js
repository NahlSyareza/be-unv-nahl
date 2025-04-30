const storeControl = require("../controllers/store.controller");
const express = require("express");
const router = express.Router();

router.get("/getAll", storeControl.getAllStores);
router.post("/create", storeControl.createStore);
router.get("/:id", storeControl.getStore);
router.put("/", storeControl.updateStore);
router.get("/do/debug", storeControl.debug);
router.delete("/:id", storeControl.deleteStore);

module.exports = router;
