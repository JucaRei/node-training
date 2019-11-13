// do express
import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello juca' });
});

// module.exports = routes;
export default routes;
