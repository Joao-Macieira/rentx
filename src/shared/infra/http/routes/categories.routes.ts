import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategory.controller';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategory.controller';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategories.controller';
import { Router } from 'express';
import multer from 'multer';
import { ensureAdmin } from '../middlewares/ensureAdmin.middleware';
import { ensureAutheticated } from '../middlewares/ensureAuthenticated.middleware';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post('/', ensureAutheticated, ensureAdmin, createCategoryController.handle);

categoriesRoutes.post('/import', ensureAutheticated, ensureAdmin, upload.single('file'), importCategoryController.handle);

export { categoriesRoutes };
