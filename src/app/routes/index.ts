import { Router } from 'express';
import IdeaRoutes from '../modules/idea/idea.route';
import CategoryRoutes from '../modules/category/category.route';

const router = Router();

const moduleRoutes = [
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
