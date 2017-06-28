import * as express from "express";
import * as compression from "compression";
import * as body_parser from "body-parser";

import { basic_router } from "./routes/index_routes";
import { SERVER_RESPONSE_CODES } from "./constants";


type ENVIRONMENT_TYPE = 'production' | 'development' | 'test';
/**
 * 
 * 
 * @class Server
 */

class Server {

    /**
     * 
     * 
     * @private
     * @type {ENVIRONMENT_TYPE}
     * @memberof Server
     */
    private _ENVIRONMENT: ENVIRONMENT_TYPE;

    /**
     * 
     * 
     * @private
     * @type {number}
     * @memberof Server
     */
    private _PORT: number;

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
        this._ENVIRONMENT = process.env.NODE_ENV || env;
        this._PORT = process.env.PORT || port;
        this._public_files = public_dir;
        this.app = express();
    }

    /**
     * 
     * 
     * @memberof Server
     */
    set port(port: number) {
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
    get port(): number {
        return this._PORT;
    }


    /**
     * 
     * 
     * @memberof Server
     */
    set environment(env: ENVIRONMENT_TYPE) {
        this._ENVIRONMENT = env;
    }


    /**
     * 
     * 
     * @readonly
     * @type {ENVIRONMENT_TYPE}@memberof Server
     */
    get environment(): ENVIRONMENT_TYPE {
        return this._ENVIRONMENT;
    }


    /**
     * 
     * 
     * @memberof Server
     */
    set public_files(route: string) {
        if (route.length > 0 && route.indexOf("/") > -1) {
            this._public_files = route;
            return;
        }
        throw "The route of public_files cannot be empty and need to contain at least a / char";
    }
    /**
     * 
     * 
     * @readonly
     * @type {string}@memberof Server
     */
    get public_files(): string {
        return this._public_files;
    }


    /**
     * 
     * 
     * @memberof Server
     */
    set expressApp(new_app: any) {
        this.app = new_app;
    }
    /**
     * 
     * 
     * @readonly
     * @type {*}@memberof Server
     */
    get expressApp(): any {
        return this.app;
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
        this.app.listen(this._PORT);
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

        if (this._ENVIRONMENT !== 'test') {
            this.runServer();
        } else {
            module.exports = {
                running_server: this.app,
                Server: Server
            };
        }

    }




}



const server: Server = new Server(process.env.NODE_ENV, process.env.PORT);


// Starts the server
server.startServer();