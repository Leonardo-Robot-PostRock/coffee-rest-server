"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("../database/config"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth/';
        //Conectar a base de datos
        this.connectToDB();
        //Middlewares
        this.middlewares();
        //Rutas de mi aplicación
        this.routes();
    }
    connectToDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.default)();
        });
    }
    routes() {
        this.app.use(this.usersPath, require('../routes/users.routes'));
        this.app.use(this.authPath, require('../routes/auth.routes'));
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //Lectura y parseo del body
        this.app.use(express_1.default.json());
        //Directorio público
        this.app.use(express_1.default.static('public'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map