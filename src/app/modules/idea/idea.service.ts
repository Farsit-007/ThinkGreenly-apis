/* eslint-disable @typescript-eslint/no-explicit-any */

import { Idea, IdeaStatus } from '@prisma/client';
import prisma from '../../config/prisma';
import { TIdeaFilterParams, TIdeaPayload } from './idea.types';
import { ideaFilters } from './idea.utilities';

export class IdeaServices {
  // createIdeaIntoDB
  static async createIdeaIntoDB(payload: TIdeaPayload) {    
    const result = await prisma.idea.create({
      data: {
      title: payload.title,
      problemStatement: payload.problemStatement,
      solution: payload.solution,
      description: payload.description, 
      price: Number(payload.price),
      isPaid: payload.isPaid,
      status: payload.status as IdeaStatus,
      feedback: payload.feedback,
      categoryId: payload.categoryId,
      authorId: payload.authorId,
      images: payload.images,
    },
    });
    return result;
  }

  // getAllIdeasFromDB
  static getAllIdeasFromDB = async (
    params?: TIdeaFilterParams,
    options?: any
  ) => {
    const { limit, page, skip } = options;
    const filterOptions = ideaFilters(params);
    const result = await prisma.idea.findMany({
      where: filterOptions,
      skip: page ? skip : undefined,
      take: limit ? limit : undefined,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : { createdAt: 'desc' },
      include: {
        votes: true,
        author: true,
        category: true,
        comments: true,
        purchases: true,
      },
    });
    const count = await prisma.idea.count({ where: filterOptions });

    return {
      meta: {
        page: page || 1,
        limit: limit || 10,
        total: count,
        totalPage: Math.ceil(count / limit),
      },
      data: result,
    };
  };

  // getSingleIdeaFromDB
  static getSingleIdeaFromDB = async (id: string): Promise<Idea | null> => {
    const result = await prisma.idea.findUnique({
      where: { id,isDeleted:false },
    });

    return result;
  };

  // updateIdeaFromDB
  static updateIdeaFromDB = async (
    id: string,
    payload: Partial<Idea>
  ): Promise<Idea | null> => {

    const floatPrice = Number(payload.price);
    payload.price = floatPrice;
    const result = await prisma.idea.update({
      where: { id,isDeleted:false },
      data: payload,
    });
    return result;
  };

  // deleteAnIdeaFromDB
  static deleteAnIdeaFromDB = async (id: string) => {
    const result = await prisma.idea.update({
      where: { id,isDeleted:false },
      data: {isDeleted:true}
    });
    return result;
  };
}
