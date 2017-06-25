Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const basic_router = express.Router();
exports.basic_router = basic_router;
basic_router.get('/', (req, res) => {
    res.send({ message: "WELCOME!" });
});
basic_router.get('/test', (req, res) => {
    res.send({ message: "Hello world :)" });
});
