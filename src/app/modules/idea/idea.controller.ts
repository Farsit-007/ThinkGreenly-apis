import catchAsync from '../../utils/catchAsync';
import { sendImageToCloudinary } from '../../utils/cloudinaryImageUploader';
import { httpStatus } from '../../utils/httpStatus';
import pick from '../../utils/pick';
import sendResponse from '../../utils/sendResponse';
import { ideaFilterOptions, ideaPaginationOption } from './idea.constants';
import { IdeaServices } from './idea.service';

export class IdeaControllers {
  // createIdea
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
    const result = await IdeaServices.createIdeaIntoDB(payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Idea created successfully',
      data: result,
    });
  });

  // getAllIdeas
  static getAllIdeas = catchAsync(async (req, res) => {
    const filters = pick(req.query, ideaFilterOptions);
    const options = pick(req.query, ideaPaginationOption);
    const result = await IdeaServices.getAllIdeasFromDB(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Ideas fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  });

  // getSingleIdea
  static getSingleIdea = catchAsync(async (req, res) => {
    const result = await IdeaServices.getSingleIdeaFromDB(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Idea fetched successfully',
      data: result,
    });
  });

  // updateAIdea
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
      const existingIdea = await IdeaServices.getSingleIdeaFromDB(
        req.params.id
      );
      if (existingIdea) {
        payload.images = existingIdea.images;
      }
    }

    const result = await IdeaServices.updateIdeaFromDB(req.params.id, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Idea updated successfully',
      data: result,
    });
  });

  // deleteAIdea
  static deleteAIdea = catchAsync(async (req, res) => {
    const result = await IdeaServices.deleteAnIdeaFromDB(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Idea deleted successfully',
      data: result,
    });
  });
}
