import { Request, Response } from "express";
import { httpStatus } from "../../utils/httpStatus";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import voteService from "./vote.service";
import { IVotePayload } from "./vote.interface";
import { JwtPayload } from "jsonwebtoken";

// Controller for handling vote-related requests
const voteController = {
  /**
   * Create or update a vote
   * @route POST /api/votes
   */
  createOrUpdateVote: catchAsync(async (req: Request, res: Response) => {
    const user = req.user as JwtPayload;
    const payload: IVotePayload = req.body;

    const result = await voteService.createOrUpdateVote(user.userId, payload);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      // success: true,
      message: "Vote registered successfully",
      data: result,
    });
  }),

  /**
   * Remove a vote
   * @route DELETE /api/votes/:ideaId
   */
  removeVote: catchAsync(async (req: Request, res: Response) => {
    const user = req.user as JwtPayload;
    const { ideaId } = req.params;

    await voteService.removeVote(user.userId, ideaId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      // success: true,
      message: "Vote removed successfully",
      data: null,
    });
  }),

  /**
   * Get vote statistics for an idea
   * @route GET /api/votes/stats/:ideaId
   */
  getVoteStats: catchAsync(async (req: Request, res: Response) => {
    const { ideaId } = req.params;

    const result = await voteService.getVoteStats(ideaId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      // success: true,
      message: "Vote statistics retrieved successfully",
      data: result,
    });
  }),

  /**
   * Check user's vote on an idea
   * @route GET /api/votes/:ideaId
   */
  getUserVote: catchAsync(async (req: Request, res: Response) => {
    const user = req.user as JwtPayload;
    const { ideaId } = req.params;

    const result = await voteService.getUserVote(user.userId, ideaId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      // success: true,
      message: "User vote retrieved successfully",
      data: result,
    });
  }),
};

export default voteController;