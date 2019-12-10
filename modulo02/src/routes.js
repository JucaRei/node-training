// do express
import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// store - nome do metodo que esta usando dentro da classe
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
// usar globalmente (obs: so funciona para as rotas que vem após ele, cronologicamente)
routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);

routes.get('/schedule', ScheduleController.index);

// single - 1 upload por vez e não vários
routes.post('/files', upload.single('file'), FileController.store);

// module.exports = routes;
export default routes;
