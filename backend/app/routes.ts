import { Router } from 'express';
import resumeRoutes from './resume/resume.route';
import userRoutes from './user/user.route';

const router = Router();

router.use('/user', userRoutes);
router.use('/resume', resumeRoutes);

export default router;