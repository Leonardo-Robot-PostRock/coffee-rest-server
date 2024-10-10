import { Application } from "express";
import express from 'express';
import cors from 'cors';
import dbConnection from '../database/config';

export class Server {
	public app: Application;
	public port: string | undefined;
	public usersPath: string;
	public authPath: string;

	constructor() {
		this.app = express();
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

	async connectToDB() {
		await dbConnection();
	}

	routes() {
		this.app.use(this.usersPath, require('../routes/users.routes'));
		this.app.use(this.authPath, require('../routes/auth.routes'));
	}

	middlewares() {
		//CORS
		this.app.use(cors());

		//Lectura y parseo del body
		this.app.use(express.json())

		//Directorio público
		this.app.use(express.static('public'));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log('Servidor corriendo en puerto', this.port);
		});
	}
}