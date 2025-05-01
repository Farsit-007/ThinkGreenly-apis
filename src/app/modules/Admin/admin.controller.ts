import catchAsync from '../../utils/catchAsync';
import { httpStatus } from '../../utils/httpStatus';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';

// getAllUsers
const getAllUsers = catchAsync(async (req, res) => {
  const result = await AdminService.getAllUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'All users fetched successfully!',
    data: result.data,
    meta: result.meta,
  });
});

// getAllIdeas
const getAllIdeas = catchAsync(async (req, res) => {
  const result = await AdminService.getAllIdeasFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'All ideas fetched successfully!',
    data: result.data,
    meta: result.meta,
  });
});

// updateIdeaStatus
const updateIdeaStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminService.updateIdeaStatusIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Idea status updated successfully!',
    data: result,
  });
});

export const AdminController = {
  getAllUsers,
  getAllIdeas,
  updateIdeaStatus,
};
