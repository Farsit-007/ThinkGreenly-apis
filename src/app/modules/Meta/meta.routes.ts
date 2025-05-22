import { Router } from 'express';
import { metaController } from './meta.controller';
import { auth } from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.get(
  '/',
  auth(Role.ADMIN, Role.MEMBER),
  metaController.fetchDashboardMetaData
);

export const MetaRoutes = router;
