import express from 'express';
<<<<<<< HEAD
import IdeaRoutes from '../modules/idea/idea.route';
=======
import { CategoryRoutes } from '../modules/category/category.route';
>>>>>>> cbd32b90369ab02148bddf06657eed778f8cf814

const router = express.Router();

const moduleRoutes = [
  {
<<<<<<< HEAD
    path: '/ideas',
    route: IdeaRoutes,
=======
    path: '/categories',
    route: CategoryRoutes,
>>>>>>> cbd32b90369ab02148bddf06657eed778f8cf814
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
