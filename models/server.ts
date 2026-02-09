import { Application } from "express";
import express from 'express';
import cors from 'cors';
import dbConnection from '../database/config';
import userRoutes from '../routes/users';
import authRoutes from '../routes/auth';
import categoriesRoutes from '../routes/categories';

export class Server {
	public app: Application;
	public port!: string;
	public path: {
		auth: string;
		categories: string;
		products: string;
		users: string;
	};

	constructor() {
		this.app = express();
		this.port = process.env.PORT || '9090';


		this.path = {
			auth: '/api/auth',
			categories: '/api/categories',
			products: '/api/products',
			users: '/api/users',
		}

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
		this.app.use(this.path.users, userRoutes);
		this.app.use(this.path.auth, authRoutes);
		this.app.use(this.path.categories, categoriesRoutes)
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