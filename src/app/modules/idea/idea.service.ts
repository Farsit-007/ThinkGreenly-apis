/* eslint-disable @typescript-eslint/no-explicit-any */

import { Idea } from '@prisma/client';
import prisma from '../../config/prisma';
import { TIdeaFilterParams, TIdeaPayload } from './idea.types';
import { ideaFilters } from './idea.utilities';

/**
 *
 * @param payload data for create or update
 */

export class IdeaServices {
  // service function for creating idea
  static async createIdea(payload: TIdeaPayload) {
    const result = await prisma.idea.create({
      data: payload,
    });
    return result;
  }

  // service function for getting all ideas
  static getAllIdeas = async (params?: TIdeaFilterParams, options?: any) => {
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
    const totalCount = await prisma.idea.count({ where: filterOptions });
    return {
      meta: {
        page: page || 1,
        limit: limit || 10,
        total: totalCount,
      },
      data: result,
    };
  };

  // service function for getting a idea by id
  static getSingleIdea = async (id: string): Promise<Idea | null> => {
    const result = await prisma.idea.findUnique({
      where: { id },
    });

    return result;
  };

  // service function for updating a idea by id
  static updateIdea = async (
    id: string,
    payload: Partial<Idea>
  ): Promise<Idea | null> => {
    const result = await prisma.idea.update({
      where: { id },
      data: payload,
    });
    return result;
  };

  // service function for deleting a idea by id
  static deleteAIdea = async (id: string) => {
    const result = await prisma.idea.delete({
      where: { id },
    });
    return result;
  };
}
