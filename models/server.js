const express = require('express');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		//Middlewares
		this.middlewares();

		//Rutas de mi aplicación
		this.routes();
	}

	routes() {
		this.app.get('/api', (req, res) => {
			res.json({
				msg: 'get API',
			});
		});

		this.app.put('/api', (req, res) => {
			res.json({
				msg: 'put API',
			});
		});

		this.app.post('/api', (req, res) => {
			res.json({
				msg: 'post API',
			});
		});

		this.app.patch('/api', (req, res) => {
			res.json({
				msg: 'patch API',
			});
		});

		this.app.delete('/api', (req, res) => {
			res.json({
				msg: 'delete API',
			});
		});
	}

	middlewares() {
		//Directorio público
		this.app.use(express.static('public'));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log('Servidor corriendo en puerto', this.port);
		});
	}
}

module.exports = Server;
