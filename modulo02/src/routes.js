// do express
import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// store - nome do metodo que esta usando dentro da classe
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
// usar globalmente (obs: so funciona para as rotas que vem após ele, cronologicamente)
routes.use(authMiddleware);
routes.put('/users', UserController.update);

// routes.put('/users', authMiddleware, UserController.update);

// module.exports = routes;
export default routes;

// import User from './app/models/User';

/* routes.get('/', async (req, res) => {
      const user = await User.create({
        name: 'Reinaldo P Junior',
        email: 'reinaldo@gmail.com',
        password_hash: '123818773158',
      })

      return res.json(user);
    }); */
