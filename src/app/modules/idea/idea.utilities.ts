import { Prisma } from "@prisma/client";
import { TIdeaFilterParams } from "./idea.types";
import { searchFields } from "./idea.constants";

export const ideaFilters = (
  params?: TIdeaFilterParams
): Prisma.IdeaWhereInput | undefined => {
  if (!params) return undefined;

  const { searchTerm, minPrice, maxPrice, ...restFilters } = params;

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

  if (minPrice || maxPrice) {
    const priceFilter: Prisma.FloatFilter = {};
    if (minPrice) priceFilter.gte = Number(minPrice);
    if (maxPrice) priceFilter.lte = Number(maxPrice);
    andConditions.push({ price: priceFilter });
  }

  for (const key in restFilters) {
    let value = restFilters[key as keyof typeof restFilters];
    if (value !== undefined && value !== '') {
      if (key === 'isPaid' || key === 'isDeleted') {
        value = value === 'true';
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
