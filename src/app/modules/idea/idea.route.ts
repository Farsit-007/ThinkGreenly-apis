import { NextFunction, Request, Response, Router } from 'express';
import { uploadFile } from '../../utils/cloudinaryImageUploader';
import { IdeaControllers } from './idea.controller';
import { auth } from '../../middlewares/auth';
import { Role } from '@prisma/client';

const IdeaRoutes: Router = Router();

IdeaRoutes.post(
  '/draft',
  uploadFile.array('images', 10),
  auth(Role.MEMBER, Role.ADMIN),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  IdeaControllers.draftAnIdea
);

IdeaRoutes.post(
  '/',
  uploadFile.array('images', 10),
  auth(Role.MEMBER, Role.ADMIN),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  IdeaControllers.createAnIdea
);

IdeaRoutes.get('/', IdeaControllers.getAllIdeas);

IdeaRoutes.get('/:id', IdeaControllers.getSingleIdea);

IdeaRoutes.put(
  '/:id',
  uploadFile.array('images', 10),
  auth(Role.MEMBER, Role.ADMIN),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);

    next();
  },
  IdeaControllers.updateAIdea
);

IdeaRoutes.delete('/:id', IdeaControllers.deleteAIdea);

export default IdeaRoutes;
