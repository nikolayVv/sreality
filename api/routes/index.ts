import { Router } from 'express';
import * as flatsController from '../controllers/flats';

const routerApi = Router();

// Flats
routerApi.route('/flats').get(flatsController.getFlatsPerPage);
routerApi.route('/flatsCount').get(flatsController.getFlatsCount);

export default routerApi;