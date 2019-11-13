import express from 'express';
import routes from './routes';

class App {
  // instanciar
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

// exportando o server
// module.exports = new App().server;
export default new App().server;
