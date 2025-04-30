import express from 'express';
import IdeaRoutes from '../modules/idea/idea.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/ideas',
    route: IdeaRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
