import catchAsync from '../../utils/catchAsync';
import { httpStatus } from '../../utils/httpStatus';
import sendResponse from '../../utils/sendResponse';
import { CategoryService } from './category.service';

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.createCategoryIntoDB(req.body);

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Category is created successfully',
    undefined,
    result
  );
});

const getAllCategories = catchAsync(async (req, res) => {
  const result = await CategoryService.getAllCategoriesFromDB(req.query);

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Category list retrieved successfully',
    result.meta,
    result.data
  );
});

export const CategoryController = {
  createCategory,
  getAllCategories,
};
