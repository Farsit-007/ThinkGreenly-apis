import { NextFunction, Request, Response, Router } from 'express';
import { uploadFile } from '../../utils/cloudinaryImageUploader';
import { IdeaControllers } from './idea.controller';

const IdeaRoutes: Router = Router();

IdeaRoutes.post(
  '/',
  uploadFile.array('images', 10),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    
    next();
  },
  IdeaControllers.createIdea
);
IdeaRoutes.get('/', IdeaControllers.getAllIdeas);
IdeaRoutes.get('/:id', IdeaControllers.getSingleIdea);
IdeaRoutes.put(
  '/:id',
  uploadFile.array('images', 10),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);

    next();
  },
  IdeaControllers.updateAIdea
);
IdeaRoutes.delete('/:id', IdeaControllers.deleteAIdea);

export default IdeaRoutes;
