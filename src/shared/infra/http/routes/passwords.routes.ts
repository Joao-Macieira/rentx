import { Router } from 'express';

import { SendForgotPasswordMailController } from '@modules/accounts/usecases/sendForgotPasswordMail/SendForgotPasswordMail.controller';
import { ResetPasswordUserController } from '@modules/accounts/usecases/resetPasswordUser/ResetPasswordUser.controller';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRoutes.post('/reset', resetPasswordUserController.handle);

export { passwordRoutes };
