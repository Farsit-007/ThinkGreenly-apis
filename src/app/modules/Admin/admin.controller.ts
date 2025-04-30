import catchAsync from '../../utils/catchAsync';
import { httpStatus } from '../../utils/httpStatus';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';

const getAllIdeas = catchAsync(async (req, res) => {
  const result = await AdminService.getAllIdeas(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'All Idea retrieve successfully',
    data: result,
  });
});
const updateIdeaStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminService.updateIdeaStatus(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Idea status updated successfully',
    data: result,
  });
});

export const AdminController = {
  getAllIdeas,
  updateIdeaStatus
};
