const express = require("express");
// To generate UUID and not for mining
const crypto = require("crypto");
const cors = require("cors");

const app = express();
app.use(express.json());

require("dotenv").config();

const storeRoute = require("../src/routes/store.route");
const userRoute = require("../src/routes/user.route");
const itemRoute = require("../src/routes/item.route");
const transactRoute = require("../src/routes/transaction.route");

app.use(
  cors({
    // origin: "http://127.0.0.1/",
    methods: "GET,POST,PUT,DELETE",
  })
);

app.use("/store", storeRoute);
app.use("/user", userRoute);
app.use("/item", itemRoute);
app.use("/transaction", transactRoute);

app.get("/", (req, res) => {
  res.send("Start querying now!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});

module.exports = app;
