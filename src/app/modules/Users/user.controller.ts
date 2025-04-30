import catchAsync from '../../utils/catchAsync';
import { httpStatus } from '../../utils/httpStatus';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);
  sendResponse(
    res,
    httpStatus.CREATED,
    true,
    'User created Successfully',
    undefined,
    result
  );
});

export const userControllers = {
  createUser,
};
