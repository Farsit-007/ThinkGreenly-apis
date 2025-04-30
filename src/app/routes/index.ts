import express from 'express';
import { userRoutes } from '../modules/Users/user.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { authRoutes } from '../modules/Auth/auth.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
