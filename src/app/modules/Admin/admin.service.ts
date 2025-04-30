import { IdeaStatus, Prisma } from "@prisma/client";
import { PaginationHelper } from "../../builder/paginationHelper";
import prisma from "../../config/prisma";
import { ConditionsBuilder } from "../../builder/conditionsBuilder";
import { ideaFields } from "./admin.constant";


const getAllIdeas = async (query: Record<string, unknown>) => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelper.calculatePagination(query);

  let andConditions: Prisma.IdeaWhereInput[] = [];

  // Dynamically build query filters
  andConditions = ConditionsBuilder.prisma(query, andConditions, ideaFields);

  // Dynamic status filter
  let statusFilter: Prisma.IdeaWhereInput;
  if (query?.status) {
    statusFilter = {
      status: query.status as IdeaStatus, // single status filter
    };
  } else {
    statusFilter = {
      status: {
        in: [IdeaStatus.APPROVED,IdeaStatus.UNDER_REVIEW,IdeaStatus.APPROVED],
      },
    };
  }

  const whereConditions: Prisma.IdeaWhereInput =
    andConditions.length > 0
      ? {
          AND: [...andConditions, statusFilter],
        }
      : statusFilter;

  const result = await prisma.idea.findMany({
    where: whereConditions,
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

  const count = await prisma.idea.count({
    where: whereConditions,
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



  export const AdminService = {
    getAllIdeas
  }




