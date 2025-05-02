import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import { httpStatus } from '../../utils/httpStatus';
import sendResponse from '../../utils/sendResponse';
import { commentService } from './comments.service';

const createComments = catchAsync(async (req, res) => {
  if (!req.user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You must be logged in to comment.'
    );
  }

  const result = await commentService.createCommentsIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'comment is created successfully',
    data: result,
  });
});

const getAllComments = catchAsync(async (req, res) => {
  const { ideaId } = req.params;
  const result = await commentService.getAllCommentFromDB(ideaId);

  if (!req.user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You must be logged in to view comments.'
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'comment list retrieved successfully',
    // meta: result?.meta,
    data: result,
  });
});

const deleteComments = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await commentService.deleteCommentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'comment deleted successfully',
    // meta: result?.meta,
    data: result,
  });
});

export const commentController = {
  createComments,
  getAllComments,
  deleteComments,
};
