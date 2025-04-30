import { Prisma } from '@prisma/client';
import { TIdeaFilterParams } from './idea.types';
import { searchFields } from './idea.constants';

export const ideaFilters = (
  params?: TIdeaFilterParams
): Prisma.IdeaWhereInput | undefined => {
  if (!params) return undefined;
  const { searchTerm, ...exactFilters } = params;

  const where: Prisma.IdeaWhereInput = {};

  if (searchTerm) {
    where.OR = searchFields.map((field) => ({
      [field]: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    }));
  }

  const andConditions: Prisma.IdeaWhereInput[] = [];

  for (const key in exactFilters) {
    const value = exactFilters[key];
    if (value !== undefined && value !== '') {
      andConditions.push({ [key]: value });
    }
  }

  for (const key in exactFilters) {
    const value = exactFilters[key];
    if (value !== undefined && value !== '') {
      if (typeof exactFilters.isPaid === 'string') {
        if (exactFilters.isPaid === 'true') {
          exactFilters.isPaid = true;
        }
        if (exactFilters.isPaid === 'false') {
          exactFilters.isPaid = false;
        }
      }
      andConditions.push({ [key]: value });
    }
  }

    andConditions.push({ isDeleted: false });
  if (andConditions.length) {
    where.AND = andConditions;
  }
  return where;
};
