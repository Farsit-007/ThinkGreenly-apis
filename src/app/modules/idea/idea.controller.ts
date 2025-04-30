import catchAsync from '../../utils/catchAsync';
import { sendImageToCloudinary } from '../../utils/cloudinaryImageUploader';
import { httpStatus } from '../../utils/httpStatus';
import pick from '../../utils/pick';
import sendResponse from '../../utils/sendResponse';
import { ideaFilterOptions, ideaPaginationOption } from './idea.constants';
import { IdeaServices } from './idea.service';

export class IdeaControllers {
  // controller function for creating idea
  static createIdea = catchAsync(async (req, res) => {
    const payload = req.body;
    payload.images = [];
    if (req.files && req.files instanceof Array) {
      const imageUrls = await Promise.all(
        req.files.map(async (file) => {
          const { secure_url } = await sendImageToCloudinary(
            file.filename,
            file.buffer
          );
          return secure_url;
        })
      );
      payload.images = imageUrls;
    }
    const result = await IdeaServices.createIdea(payload);
    sendResponse(
      res,
      httpStatus.CREATED,
      true,
      'Idea created successfully',
      undefined,
      result
    );
  });

  // controller function for get all ideas
  static getAllIdeas = catchAsync(async (req, res) => {
    const filters = pick(req.query, ideaFilterOptions);
    const options = pick(req.query, ideaPaginationOption);
    const result = await IdeaServices.getAllIdeas(filters, options);
    sendResponse(
      res,
      httpStatus.OK,
      true,
      'Ideas fetched successfully',
      result.meta,
      result.data
    );
  });

  // controller function for getting a idea by id
  static getSingleIdea = catchAsync(async (req, res) => {
    const result = await IdeaServices.getSingleIdea(req.params.id);
    sendResponse(
      res,
      httpStatus.OK,
      true,
      'Idea fetched successfully',
      undefined,
      result
    );
  });

  // controller function for updating a idea by id
  static updateAIdea = catchAsync(async (req, res) => {
    const payload = req.body;

    // Check if new image files are uploaded
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const imageUrls = await Promise.all(
        req.files.map(async (file) => {
          const { secure_url } = await sendImageToCloudinary(
            file.filename,
            file.buffer
          );
          return secure_url;
        })
      );
      payload.images = imageUrls;
    } else {
      const existingIdea = await IdeaServices.getSingleIdea(req.params.id);
      if (existingIdea) {
        payload.images = existingIdea.images;
      }
    }

    const result = await IdeaServices.updateIdea(req.params.id, payload);
    sendResponse(
      res,
      httpStatus.OK,
      true,
      'Idea updated successfully',
      undefined,
      result
    );
  });

  // controller function for deleting a idea by id
  static deleteAIdea = catchAsync(async (req, res) => {
    const result = await IdeaServices.deleteAIdea(req.params.id);
    sendResponse(
      res,
      httpStatus.OK,
      true,
      'Idea deleted successfully',
      undefined,
      result
    );
  });
}
