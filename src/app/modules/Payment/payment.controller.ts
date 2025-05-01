import { Request, Response } from 'express';
import { PaymentService } from './payment.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { httpStatus } from '../../utils/httpStatus';

// create Payment
const createPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.createPaymentIntoDB(req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Payment initiated, pay quickly!',
    data: result,
  });
});

// get All Payments (admin)
const getAllPayments = async (req: Request, res: Response) => {
  const result = await PaymentService.getAllPaymentsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Payments retrived succesfully!',
    data: result.data,
    meta: result.meta,
  });
};

// getMemberPayments
const getMemberPayments = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.getMemberPaymentsFromDB(
    req.query,
    req.user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Payments retrived succesfully!',
    data: result.data,
    meta: result.meta,
  });
});

// get Payment Details
const getPaymentDetails = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.getPaymentDetailsFromDB(
    req.params.paymentId,
    req.user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Payment retrived succesfully!',
    data: result,
  });
});

// // change Payment Status
// const changePaymentStatus = catchAsync(async (req: Request, res: Response) => {
//   const { status } = req.body;
//   const result = await PaymentService.changePaymentStatusInDB(
//     req.params.paymentId,
//     status,
//     req.user
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     message: 'Payment status changed succesfully!',
//     data: result,
//   });
// });

// validate Payment
const validatePayment = catchAsync(async (req: Request, res: Response) => {
  const tran_id = req.query.tran_id as string;

  const result = await PaymentService.validatePayment(tran_id, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Payment validated succesfully!',
    data: result,
  });
});

export const PaymentController = {
  createPayment,
  getAllPayments,
  getMemberPayments,
  getPaymentDetails,
  // changePaymentStatus,
  validatePayment,
};
