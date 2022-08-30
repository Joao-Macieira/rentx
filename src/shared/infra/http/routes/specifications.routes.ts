import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecification.controller';
import { ensureAutheticated } from '@shared/infra/http/middlewares/ensureAuthenticated.middleware';

import { ensureAdmin } from '../middlewares/ensureAdmin.middleware';

const specificationsRoute = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoute.post('/', ensureAutheticated, ensureAdmin, createSpecificationController.handle);

export { specificationsRoute };
