import catchAsync from "../../utils/catchAsync";
import { httpStatus } from "../../utils/httpStatus";
import sendResponse from "../../utils/sendResponse";
import { commentService } from "./comments.service";

const createComments = catchAsync(async (req, res) => {
    
    const result = await commentService.createCommentsIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'comment is created successfully',
      data: result,
    });
  });

  export const commentController={
    createComments
  }