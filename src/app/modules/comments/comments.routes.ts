import { Router } from 'express';
import { commentController } from './comments.controller';

const CommentsRoutes = Router();

CommentsRoutes.post('/', commentController.createComments);

export default CommentsRoutes