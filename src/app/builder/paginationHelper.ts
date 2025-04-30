import { globalPaginationOptions } from '../constants/global.constants';
import pick from '../utils/pick';

type TPaginationOptions = {
  limit?: number;
  offset?: number;
  sort?: string | undefined;
  sortOrder?: string | undefined;
};

type IOptionsResult = {
  limit: number;
  offset: number;
  sort: string;
  sortOrder: string;
};

const calculatePagination = (
  query: Record<string, unknown>
): IOptionsResult => {
  const options: TPaginationOptions = pick(query, globalPaginationOptions);

  const limit: number = Number(options?.limit) || 10;

  let offset: number = 0;
  if (options?.offset) {
    offset = Number(options.offset);
  }

  const sort: string = options?.sort || 'id';

  let sortOrder: string = 'desc';
  if (options?.sortOrder === 'asc' || options?.sortOrder === 'desc') {
    sortOrder = options.sortOrder;
  }

  return {
    limit,
    offset,
    sort,
    sortOrder,
  };
};

export const PaginationHelper = {
  calculatePagination,
};
