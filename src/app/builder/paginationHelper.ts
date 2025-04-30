import { globalPaginationOptions } from '../constants/global.constants';
import pick from '../utils/pick';

type TPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string | undefined;
  sortOrder?: string | undefined;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

const calculatePagination = (
  query: Record<string, unknown>
): IOptionsResult => {
  const options: TPaginationOptions = pick(query, globalPaginationOptions);

  const page: number = Number(options.page) || 1;
  const limit: number = Number(options?.limit) || 10;

  const skip = (Number(page) - 1) * Number(limit);

  const sortBy: string = options?.sortBy || 'id';

  let sortOrder: string = 'desc';
  if (options?.sortOrder === 'asc' || options?.sortOrder === 'desc') {
    sortOrder = options.sortOrder;
  }

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const PaginationHelper = {
  calculatePagination,
};
