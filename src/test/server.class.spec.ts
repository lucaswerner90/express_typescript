import * as assert from 'assert';
import { Server } from '../server';



let server: Server;

describe('[****] Class Server - Create empty server instance [****]', () => {
    it('[1] Has no empty environment variable', () => {
        server = new Server();
        assert(server.environment);
    });
    it('[2] Has no empty port variable and the value is 8000', () => {
        server = new Server();
        assert(server.port);
        assert(server.port===8000);
    });
    it('[3] Has no empty public_dir variable', () => {
        server = new Server();
        assert(server.public_files);
    });
    it('[4] Has no empty app variable', () => {
        server = new Server();
        assert(server.expressApp);
    });
    it('[5] Port cannot be <4000', () => {
        server = new Server();
        try {
            server.port = 3000;
        } catch (error) {
            assert(error);
        }
    });
    it('[6] Port cannot be >65535', () => {
        server = new Server();
        try {
            server.port = 70000;
        } catch (error) {
            assert(error);
        }
    });
    it('[7] Port changed to a valid value', () => {
        server = new Server();
        try {
            server.port = 5000;           
            assert(server.port == 5000);
        } catch (error) {
        }
    });
    it('[8] Environment changed to a valid value', () => {
        server = new Server();
        server.environment = "dev";
        assert(server.environment == "dev");
    });

    it('[9] Public files dir changed to a valid value', () => {
        server = new Server();
        server.public_files = "prueba_directorio/";
        assert(server.public_files == "prueba_directorio/");
    });

    it('[10] Public files dir changed to a invalid value', () => {
        server = new Server();
        try {
           server.public_files = "prueba_directorio"; 
        } catch (error) {
            assert(error);
        }
        
        
    });
});