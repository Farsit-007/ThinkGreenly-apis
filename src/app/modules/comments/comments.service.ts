import { Comment } from "@prisma/client";
import prisma from "../../config/prisma";
import AppError from "../../errors/AppError";
import { httpStatus } from "../../utils/httpStatus";

const createCommentsIntoDB = async (payload: Partial<Comment>) => {

    if(!payload.userId || !payload.ideaId || !payload.content){
        throw new AppError(httpStatus.BAD_REQUEST,"Required fields missing")
    }

    const result = await prisma.comment.create({
      data:{
        content: payload.content,
        ideaId: payload.ideaId,
        userId: payload.userId,
        parentId: payload.parentId || null,
      } ,
      include: {
        user: { select: { name: true } },
      }
      
    });
  
    return result;
  };

  export const commentService={
    createCommentsIntoDB
  }