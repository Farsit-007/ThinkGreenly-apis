import express from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import { auth } from '../../middlewares/auth';
import { Role } from '@prisma/client';


const router = express.Router();

router.post(
  '/',
  validateRequest(userValidation.createUserSchema),
  userControllers.createUser
);

router.patch("/:id/status", auth(Role.ADMIN),validateRequest(userValidation.updateUserStatusSchema),userControllers.changeUserStatus);

router.get(
  "/me",
  auth(Role.ADMIN,Role.MEMBER),
  userControllers.getMyProfile
);

export const userRoutes = router;
 