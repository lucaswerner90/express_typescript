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

    private ENVIROMENT: ENVIRONMENT_TYPE;
    private PORT: number;
    private app: any;


    /**
     * Creates an instance of Server.
     * @param {string} [env="production"] 
     * @param {number} [port=8000] 
     * 
     * @memberof Server
     */


    constructor(env: ENVIRONMENT_TYPE = "production", port: number = 8000) {
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
    private errorNotFoundHandler(request: Express.Request, response: any, next): void {
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
            this.app.listen(this.PORT);
        } else {
            module.exports = this.app;
        }

    }




}



const server = new Server();
server.startServer();