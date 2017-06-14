import * as express from "express";

const basic_router: any = express.Router();

basic_router.get('/', (req, res) => {
    res.send({ message: "WELCOME!" });
});
basic_router.get('/test', (req, res) => {
    res.send({ message: "Hello world :)" });
});

export { basic_router };