import catchAsync from '../../utils/catchAsync';
import { httpStatus } from '../../utils/httpStatus';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUserIntoDB(req.body);
  const { resfreshToken } = result;

  res.cookie('refreshToken', resfreshToken, {
    secure: false,
    httpOnly: true,
  });
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Logged in successfully',
    data: {
      token: result.accessToken,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Access Token Generated successfully',
    data: {
      token: result.accessToken,
    },
  });
});

const changedPassword = catchAsync(async (req, res) => {
  const user = req.user;
   await authServices.changedPassword(user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Password Changed Successfully',
    data: null,
  });
});


const forgetPassword = catchAsync(async (req, res) => {
  await authServices.forgetPassword(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Please, check your email",
    data: null,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization  as string;
  const result = await authServices.resetPassword(token ,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Password reseted",
    data: result,
  });
});

export const authControllers = {
  loginUser,
  refreshToken,
  changedPassword,
  forgetPassword,
  resetPassword
};
