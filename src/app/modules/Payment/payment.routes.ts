import { Router } from 'express';
import { PaymentController } from './payment.controller';
import { PaymentValidation } from './payment.validation';
import validateRequest from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.post(
  '/',
  auth(Role.MEMBER),
  // validateRequest(PaymentValidation.createPaymentValidationSchema),
  PaymentController.createPayment
);

router.get('/', auth(Role.ADMIN), PaymentController.getAllPayments);

router.get('/member', auth(Role.MEMBER), PaymentController.getMemberPayments);

router.get(
  '/details/:paymentId',
  auth(Role.MEMBER, Role.ADMIN),
  PaymentController.getPaymentDetails
);

// router.patch(
//   '/:paymentId/status',
//   auth(Role.ADMIN),
//   validateRequest(PaymentValidation.changePaymentStatusValidationSchema),
//   PaymentController.changePaymentStatus
// );

router.patch(
  '/validate',
  auth(Role.MEMBER, Role.ADMIN),
  validateRequest(PaymentValidation.validatePaymentValidationSchema),
  PaymentController.validatePayment
);

export const PaymentRoutes = router;
