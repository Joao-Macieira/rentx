import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCar.controller';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecification.controller';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCars.controller';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImage/UploadCarImages.controller';

import { ensureAdmin } from '../middlewares/ensureAdmin.middleware';
import { ensureAutheticated } from '../middlewares/ensureAuthenticated.middleware';

const carsRoutes = Router();

const upload = multer(uploadConfig.upload('./tmp/cars'));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post('/', ensureAutheticated, ensureAdmin, createCarController.handle);
carsRoutes.post('/specifications/:id', ensureAutheticated, ensureAdmin, createCarSpecificationController.handle);

carsRoutes.post(
  '/images/:id',
  ensureAutheticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImagesController.handle,
);

export { carsRoutes };
