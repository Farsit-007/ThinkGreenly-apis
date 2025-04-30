import { Router } from 'express';
import IdeaRoutes from '../modules/idea/idea.route';
import CategoryRoutes from '../modules/category/category.route';
import { userRoutes } from '../modules/Users/user.route';
import { authRoutes } from '../modules/Auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path : '/users',
    route : userRoutes
  },
  {
    path : '/auth',
    route : authRoutes
  },
  {
    path: '/ideas',
    route: IdeaRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
