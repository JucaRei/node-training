// do express
import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

// store - nome do metodo que esta usando dentro da classe
routes.post('/users', UserController.store);

// module.exports = routes;
export default routes;











// import User from './app/models/User';

/*routes.get('/', async (req, res) => {
      const user = await User.create({
        name: 'Reinaldo P Junior',
        email: 'reinaldo@gmail.com',
        password_hash: '123818773158',
      })

      return res.json(user);
    }); */
