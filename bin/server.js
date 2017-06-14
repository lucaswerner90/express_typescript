"use strict";
const express = require("express");
const compression = require("compression");
const index_routes_1 = require("./routes/index_routes");
/**
 *
 *
 * @class Server
 */
class Server {
    /**
     * Creates an instance of Server.
     * @param {string} [env="production"]
     * @param {number} [port=8000]
     *
     * @memberof Server
     */
    constructor(env = "production", port = 8000) {
        this.ENVIROMENT = process.env.NODE_ENV || env;
        this.PORT = process.env.PORT || port;
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
    errorNotFoundHandler(request, response, next) {
        response.status(404).send({ error: "Error message!" });
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
            this.app.listen(this.PORT);
        }
        else {
            module.exports = this.app;
        }
    }
}
const server = new Server();
server.startServer();
