"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const compression = require("compression");
const body_parser = require("body-parser");
const index_routes_1 = require("./routes/index_routes");
const constants_1 = require("./constants");
/**
 *
 *
 * @class Server
 */
class Server {
    /**
     * Creates an instance of Server.
     * @param {ENVIRONMENT_TYPE} [env="production"]
     * @param {number} [port=8000]
     * @param {string} [public_dir="public"]
     * @memberof Server
     */
    constructor(env = "production", port = 8000, public_dir = "public") {
        this._public_files = "public";
        this.ENVIROMENT = process.env.NODE_ENV || env;
        this.PORT = process.env.PORT || port;
        this._public_files = public_dir;
        this.app = express();
    }
    /**
     *
     *
     * @private
     *
     * @memberof Server
     */
    configureServer() {
        this.configureThirdPartyMiddlewares();
        this.configureRoutes();
        this.configureHandlers();
    }
    /**
     *
     *
     * @private
     *
     * @memberof Server
     */
    configureRoutes() {
        this.app.use(express.static(this._public_files));
        this.app.use("/", index_routes_1.basic_router);
    }
    /**
     *
     *
     * @private
     *
     * @memberof Server
     */
    configureThirdPartyMiddlewares() {
        this.app.use(compression());
        this.app.use(body_parser.urlencoded({ extended: true }));
        this.app.use(body_parser.json());
    }
    /**
     *
     *
     * @private
     * @memberof Server
     */
    runServer() {
        this.app.listen(this.PORT);
    }
    /**
     *
     *
     * @private
     *
     * @memberof Server
     */
    configureHandlers() {
        this.app.use(this.errorNotFoundHandler);
    }
    /**
     *
     *
     * @private
     * @param {Express.Request} request
     * @param {Express.Response} response
     * @param {any} next
     *
     * @memberof Server
     */
    errorNotFoundHandler(request, response = {}, next) {
        response.status(constants_1.SERVER_RESPONSE_CODES.NOT_FOUND).send({ error: "Error message!" });
    }
    /**
     * Starts the server already configured
     *
     *
     * @memberof Server
     */
    startServer() {
        this.configureServer();
        if (this.ENVIROMENT !== 'test') {
            this.runServer();
        }
        else {
            module.exports = this.app;
        }
    }
}
exports.Server = Server;
const server = new Server(process.env.NODE_ENV, process.env.PORT);
// Starts the server
server.startServer();
