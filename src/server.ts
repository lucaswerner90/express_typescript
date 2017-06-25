import * as express from "express";
import * as compression from "compression";
import * as body_parser from "body-parser";

import { basic_router } from "./routes/index_routes";
import { SERVER_RESPONSE_CODES } from "./constants";

// <reference path="node_modules/@types/express/index.d.ts"/>

type ENVIRONMENT_TYPE = 'production' | 'development' | 'test';
/**
 * 
 * 
 * @class Server
 */
export class Server{


    /**
     * 
     * 
     * @private
     * @type {ENVIRONMENT_TYPE}
     * @memberof Server
     */
    private ENVIROMENT: ENVIRONMENT_TYPE;
    /**
     * 
     * 
     * @private
     * @type {number}
     * @memberof Server
     */
    private PORT: number;
    /**
     * 
     * 
     * @private
     * @type {*}
     * @memberof Server
     */
    private app: any;


    /**
     * 
     * 
     * @private
     * @type {string}@memberof Server
     */
    private _public_files: string = "public";
    
    /**
     * Creates an instance of Server.
     * @param {ENVIRONMENT_TYPE} [env="production"] 
     * @param {number} [port=8000] 
     * @param {string} [public_dir="public"] 
     * @memberof Server
     */

    constructor(env: ENVIRONMENT_TYPE = "production", port: number = 8000, public_dir: string = "public") {
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
    private configureServer(): void {

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
    private configureRoutes(): void {
        this.app.use(express.static(this._public_files));
        this.app.use("/", basic_router);
    }

    /**
     * 
     * 
     * @private
     * 
     * @memberof Server
     */
    private configureThirdPartyMiddlewares(): void {
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
    private runServer(): void {
        this.app.listen(this.PORT);
    }

    /**
     * 
     * 
     * @private
     * 
     * @memberof Server
     */
    private configureHandlers(): void {
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
    private errorNotFoundHandler(request: Express.Request, response: any = {} as Express.Response, next: Function): void {
        response.status(SERVER_RESPONSE_CODES.NOT_FOUND).send({ error: "Error message!" });
    }


    /**
     * Starts the server already configured
     * 
     * 
     * @memberof Server
     */
    public startServer() {

        this.configureServer();

        if (this.ENVIROMENT !== 'test') {
            this.runServer();
        } else {
            module.exports = this.app;
        }

    }




}



const server: Server = new Server(process.env.NODE_ENV, process.env.PORT);

// Starts the server
server.startServer();