import { Router } from 'express';
import { UserController } from './user.controller';
// import { authMiddleware } from '../common/middleware/auth.middleware';

const router = Router();
const userController = new UserController();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/refresh-token', userController.refreshToken);
// router.get('/profile', authMiddleware, userController.getProfile);

export default router;