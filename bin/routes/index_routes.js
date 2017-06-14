"use strict";
const express = require("express");
const basic_router = express.Router();
exports.basic_router = basic_router;
basic_router.get('/', (req, res) => {
    res.send("Welcome :)");
});
basic_router.get('/test', (req, res) => {
    res.send("Hello world :)");
});
