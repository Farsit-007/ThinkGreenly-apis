import { Router } from 'express';
import IdeaRoutes from '../modules/idea/idea.route';
import CategoryRoutes from '../modules/category/category.route';
<<<<<<< HEAD
import CommentsRoutes from '../modules/comments/comments.routes';
=======
import { adminRoutes } from '../modules/Admin/admin.route';
import { userRoutes } from '../modules/Users/user.route';
import { authRoutes } from '../modules/Auth/auth.route';
>>>>>>> d8a46ade14d07b0c1308e6abee9e9e99de7bc0c0

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
  {
<<<<<<< HEAD
    path: '/comments',
    route: CommentsRoutes,
=======
    path: '/admin',
    route: adminRoutes,
>>>>>>> d8a46ade14d07b0c1308e6abee9e9e99de7bc0c0
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
