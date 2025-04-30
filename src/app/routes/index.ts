import { Router } from 'express';
import IdeaRoutes from '../modules/idea/idea.route';
import CategoryRoutes from '../modules/category/category.route';
import { adminRoutes } from '../modules/Admin/admin.route';

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
  {
    path: '/admin',
    route: adminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
