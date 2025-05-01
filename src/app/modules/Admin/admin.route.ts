import { Router } from 'express';
import { AdminController } from './admin.controller';

const router = Router();

router.get('/users', AdminController.getAllUsers);

router.get('/ideas', AdminController.getAllIdeas);

router.patch('/ideas/:id/status', AdminController.updateIdeaStatus);
router.patch('/user/:id/status', AdminController.updateUserActiveStatus);

export const adminRoutes = router;
