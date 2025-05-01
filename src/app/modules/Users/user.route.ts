import express, { NextFunction, Request, Response } from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import { auth } from '../../middlewares/auth';
import { Role } from '@prisma/client';
import { uploadFile } from '../../utils/cloudinaryImageUploader';

const router = express.Router();

router.post(
  '/',
  validateRequest(userValidation.createUserSchema),
  userControllers.createUser
);
router.patch(
  '/:id/profile',
  uploadFile.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  userControllers.updateProfile
);

router.patch(
  '/:id/status',
  auth(Role.ADMIN),
  validateRequest(userValidation.updateUserStatusSchema),
  userControllers.changeUserStatus
);
router.get('/me', auth(Role.ADMIN, Role.MEMBER), userControllers.getMyProfile);
router.get('/:id', auth(Role.ADMIN), userControllers.getSingleUser);

export const userRoutes = router;
