import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateUsersController } from '@modules/accounts/usecases/createUser/CreateUser.controller';
import { UpdateUserAvatarController } from '@modules/accounts/usecases/updateUserAvatar/UpdateUserAvatar.controller';
import { ensureAutheticated } from '@shared/infra/http/middlewares/ensureAuthenticated.middleware';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUsersController = new CreateUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post('/', createUsersController.handle);
usersRoutes.patch('/avatar', ensureAutheticated, uploadAvatar.single('avatar'), updateUserAvatarController.handle);

export { usersRoutes };
