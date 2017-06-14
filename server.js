"use strict";
const express = require("express");
const index_routes_1 = require("./routes/index_routes");
const app = express();
const PORT = process.env.PORT || 8000;
const ENV = process.env.ENV || "production";
app.use("/", index_routes_1.basic_router);
app.use(function (req, res, next) {
    res.status(404).send({ error: "Error message!" });
});
app.listen(PORT);
