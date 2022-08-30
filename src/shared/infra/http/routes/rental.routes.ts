import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRental.controller';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRental.controller';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUser.controller';
import { Router } from 'express';
import { ensureAutheticated } from '../middlewares/ensureAuthenticated.middleware';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.get('/user', ensureAutheticated, listRentalsByUserController.handle);
rentalRoutes.post('/', ensureAutheticated, createRentalController.handle);
rentalRoutes.post('/devolution/:id', ensureAutheticated, devolutionRentalController.handle);

export { rentalRoutes };
