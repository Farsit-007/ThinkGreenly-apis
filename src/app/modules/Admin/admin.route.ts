import  { Router } from 'express';
import { AdminController } from './admin.controller';

const router = Router();
router.get('/ideas', AdminController.getAllIdeas );


export const adminRoutes = router;