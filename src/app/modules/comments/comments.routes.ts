import { Router } from 'express';
import { commentController } from './comments.controller';
import { auth } from '../../middlewares/auth';
import { Role } from '@prisma/client';

const CommentsRoutes = Router();

CommentsRoutes.post('/',auth(Role.MEMBER), commentController.createComments);

CommentsRoutes.get('/',auth(Role.MEMBER), commentController.getAllComments);

CommentsRoutes.delete('/:id',auth(Role.MEMBER, Role.ADMIN), commentController.deleteComments);

export default CommentsRoutes;
