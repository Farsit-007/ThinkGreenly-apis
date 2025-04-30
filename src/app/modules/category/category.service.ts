import { Category, Prisma } from '@prisma/client';
import prisma from '../../config/prisma';
import { PaginationHelper } from '../../builder/paginationHelper';
import { ConditionsBuilder } from '../../builder/conditionsBuilder';
import { CategoryFields } from './category.constants';

const createCategoryIntoDB = async (payload: Partial<Category>) => {
  const result = await prisma.category.create({
    data: {
      name: payload.name!!,
    },
  });

  return result;
};

const getAllCategoriesFromDB = async (query: Record<string, unknown>) => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelper.calculatePagination(query);

  let andConditions: Prisma.CategoryWhereInput[] = [];

  andConditions = ConditionsBuilder.prisma(
    query,
    andConditions,
    CategoryFields
  );

  const whereConditions: Prisma.CategoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.category.findMany({
    where: {
      ...whereConditions,
    },
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const count = await prisma.category.count({
    where: {
      ...whereConditions,
    },
  });

  return {
    meta: {
      page,
      limit,
      total: Number(count),
      totalPage: Math.ceil(count / limit),
    },
    data: result,
  };
};

export const CategoryService = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
};
