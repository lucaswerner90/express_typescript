"use strict";
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
     * @param {string} [env="production"]
     * @param {number} [port=8000]
     *
     * @memberof Server
     */
    constructor(env = "production", port = 8000, public_dir = "public") {
        /**
         *
         *
         * @private
         * @type {string}@memberof Server
         */
        this._public_files = "public";
        this._ENVIROMENT = process.env.NODE_ENV || env;
        this._PORT = process.env.PORT || port;
        this._public_files = public_dir;
        this.app = express();
    }
    set port(port) {
        if (port > 4000 && port < 65536) {
            this._PORT = port;
            return;
        }
        throw "Port must be between 4000 and 65535";
    }
    /**
     *
     *
     * @readonly
     * @type {number}@memberof Server
     */
    get port() {
        return this._PORT;
    }
    /**
     *
     *
     * @memberof Server
     */
    set enviroment(env) {
        this._ENVIROMENT = env;
    }
    /**
     *
     *
     * @readonly
     * @type {ENVIRONMENT_TYPE}@memberof Server
     */
    get enviroment() {
        return this._ENVIROMENT;
    }
    /**
     *
     *
     * @memberof Server
     */
    set public_files(route) {
        if (route.length > 0 && route.includes("/")) {
            this._public_files = route;
        }
        throw "The route of public_files cannot be empty";
    }
    /**
     *
     *
     * @readonly
     * @type {string}@memberof Server
     */
    get public_files() {
        return this._public_files;
    }
    /**
     *
     *
     * @memberof Server
     */
    set expressApp(new_app) {
        this.app = new_app;
    }
    /**
     *
     *
     * @readonly
     * @type {*}@memberof Server
     */
    get expressApp() {
        return this.app;
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
        if (this._ENVIROMENT !== 'test') {
            this.app.listen(this._PORT);
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
