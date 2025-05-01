import catchAsync from '../../utils/catchAsync';
import { sendImageToCloudinary } from '../../utils/cloudinaryImageUploader';
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
    message: 'Users updated Successfully',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req, res) => {
  const result = await userServices.getMyProfile(req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Profile fetched Successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const result = await userServices.getSingleUserFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User fetched Successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const payload = req.body;

  if (req.file) {
    const { secure_url } = await sendImageToCloudinary(
      req.file.filename,
      req.file.buffer
    );
    payload.image = secure_url;
  } 
  else {
    const existingUser = await userServices.getSingleUserFromDB(req.params.id);
    if (existingUser) {
      payload.image = existingUser.image;
    }
  }
  const result = await userServices.updateProfile(req.params.id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Profile updated successfully',
    data: result,
  });
});

export const userControllers = {
  createUser,
  changeUserStatus,
  getMyProfile,
  updateProfile,
  getSingleUser,
};
