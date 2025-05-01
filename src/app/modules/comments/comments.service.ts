import { Comment } from '@prisma/client';
import prisma from '../../config/prisma';
import AppError from '../../errors/AppError';
import { httpStatus } from '../../utils/httpStatus';
import { JwtPayload } from 'jsonwebtoken';

const createCommentsIntoDB = async (payload: Partial<Comment>,user:JwtPayload) => {
  if ( !payload.ideaId || !payload.content) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Required fields missing');
  }
 const filterData={
  content: payload.content,
  ideaId: payload.ideaId,
  userId: user.id,
  parentId: payload.parentId || null,
}
  const result = await prisma.comment.create({
    data:filterData ,
    include: {
      user: { select: { name: true } },
    },
  });

  return result;
};

const getAllCommentFromDB = async (ideaId: string) => {
  const comments = await prisma.comment.findMany({
    where: {
      ideaId,
      parentId: null,
    },
    include: {
      user: true,
      replies: {
        include: {
          user: true,
          replies: true,
        },
      },
    },
    orderBy: { createdAt: 'asc' },
  });
  return comments;
};

const deleteCommentFromDB = async (id: string,user:JwtPayload) => {
  const userId=user.id;
  const comment = await prisma.comment.delete({
    where: { id ,userId},
  });
  return comment;
};

export const commentService = {
  createCommentsIntoDB,
  getAllCommentFromDB,
  deleteCommentFromDB,
};
