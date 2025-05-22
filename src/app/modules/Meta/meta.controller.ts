import { Request, Response } from 'express';
import { metaService } from './meta.service';
import { httpStatus } from '../../utils/httpStatus';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const fetchDashboardMetaData = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await metaService.fetchDashboardMetaData(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Meta data retrived successfully!',
      data: result,
    });
  }
);

export const metaController = {
  fetchDashboardMetaData,
};
