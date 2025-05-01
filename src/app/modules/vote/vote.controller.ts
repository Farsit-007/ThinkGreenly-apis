import { Request, Response } from "express";
import { httpStatus } from "../../utils/httpStatus";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {voteService} from "./vote.service";
import { IVotePayload } from "./vote.interface";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../config/prisma";


const createOrUpdateVote = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const payload: IVotePayload = req.body;
  const userData = await prisma.user.findUnique({
    where: {
      email: user.email,
    }
  });
  if (!userData?.id) {
    throw new Error("User not found or user ID is missing.");
  }
  const userId = userData?.id;
  const result = await voteService.createOrUpdateVote(userId, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Vote registered successfully",
    data: result,
  });
});


const removeVote = catchAsync(async (req, res) => {
  const user = req.user as JwtPayload;
  const ideaId = req.params?.ideaId;
  const userData = await prisma.user.findUnique({
    where: {
      email: user.email,
    }
  });
  if (!userData?.id) {
    throw new Error("User not found or user ID is missing.");
  }
  const userId = userData?.id;
  await voteService.removeVote(userId, ideaId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Vote removed successfully",
    data: null,
  });
});


const getVoteStats = catchAsync(async (req: Request, res: Response) => {
  const ideaId  = req.params.ideaId;
  const result = await voteService.getVoteStats(ideaId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Vote statistics retrieved successfully",
    data: result,
  });
});


const getUserVote = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const userData = await prisma.user.findUnique({
    where: {
      email: user.email,
    }
  });
  if (!userData?.id) {
    throw new Error("User not found or user ID is missing.");
  }
  const userId = userData?.id;
  const ideaId  = req.params.ideaId;
  const result = await voteService.getUserVote(userId, ideaId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "User vote retrieved successfully",
    data: result,
  });
});


export const voteController = {
  createOrUpdateVote,
  removeVote,
  getVoteStats,
  getUserVote
};
