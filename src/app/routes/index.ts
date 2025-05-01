import { Router } from 'express';
import IdeaRoutes from '../modules/idea/idea.route';
import CategoryRoutes from '../modules/category/category.route';
import CommentsRoutes from '../modules/comments/comments.routes';

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
    path: '/comments',
    route: CommentsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
