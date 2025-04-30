import catchAsync from '../../utils/catchAsync';
import { httpStatus } from '../../utils/httpStatus';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'User created successfully',
    data: result,
  });
});

const changeUserStatus = catchAsync(async (req, res) => {
  const result = await userServices.changeUserStatus(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Users updated Successfully",
    data: result,
  });
});

const getMyProfile = catchAsync(
  async (req, res) => {
    const result = await userServices.getMyProfile(req.user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "Profile fetched Successfully",
      data: result,
    });
  }
);

export const userControllers = {
  createUser,
  changeUserStatus,
  getMyProfile
};
