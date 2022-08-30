import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/usecases/authenticateUser/AuthenticateUser.controller';
import { RefreshTokenController } from '@modules/accounts/usecases/refreshToken/RefreshToken.controller';

const authRoutes = Router();

const authController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authRoutes.post('/sessions', authController.handle);
authRoutes.post('/refresh-token', refreshTokenController.handle);

export { authRoutes };
