import * as express from "express";

const basic_router:any = express.Router();

basic_router.get('/', (req, res) => {
    res.send("Welcome :)");
});
basic_router.get('/test', (req, res) => {
    res.send("Hello world :)");
});

export { basic_router };