
import { VoteType } from "@prisma/client";
import prisma from "../../config/prisma";
import { IVotePayload, IVoteResponse, IVoteStats } from "./vote.interface";
import NotFound from "../../errors/NotFound";
import PermissionDenied from "../../errors/PermissionDenied";
import NotAcceptable from "../../errors/NotAcceptable";

// Service for handling vote-related operations
const voteService = {
  createOrUpdateVote: async (userId: string, payload: IVotePayload): Promise<IVoteResponse> => {
    const { ideaId, type } = payload;

    // Check if idea exists and is approved
    const idea = await prisma.idea.findUnique({
      where: { id: ideaId },
    });

    if (!idea) {
      throw new NotFound("Idea not found");
    }

    if (idea.status !== "APPROVED") {
      throw new NotAcceptable("Cannot vote on ideas that are not approved");
    }

    // Check if the idea is paid and if the user has purchased it
    if (idea.isPaid) {
      const hasPurchased = await prisma.purchase.findUnique({
        where: {
          userId_ideaId: {
            userId,
            ideaId,
          },
        },
      });

      if (!hasPurchased) {
        throw new PermissionDenied("You must purchase this idea before voting");
      }
    }

    // Check if user already voted on this idea
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_ideaId: {
          userId,
          ideaId,
        },
      },
    });

    if (existingVote) {
      // Update existing vote if type is different
      if (existingVote.type !== type) {
        const updatedVote = await prisma.vote.update({
          where: {
            userId_ideaId: {
              userId,
              ideaId,
            },
          },
          data: { type },
        });
        return updatedVote;
      }
      return existingVote; // Return existing vote if type is the same
    }

    // Create new vote
    const newVote = await prisma.vote.create({
      data: {
        userId,
        ideaId,
        type,
      },
    });

    return newVote;
  },

  /**
   * Remove a user's vote from an idea
   * @param userId - ID of the user removing the vote
   * @param ideaId - ID of the idea to remove vote from
   */
  removeVote: async (userId: string, ideaId: string): Promise<void> => {
    // Check if idea exists
    const idea = await prisma.idea.findUnique({
      where: { id: ideaId },
    });

    if (!idea) {
      throw new NotFound("Idea not found");
    }

    // Check if vote exists
    const vote = await prisma.vote.findUnique({
      where: {
        userId_ideaId: {
          userId,
          ideaId,
        },
      },
    });

    if (!vote) {
      throw new NotFound("Vote not found");
    }

    // Delete the vote
    await prisma.vote.delete({
      where: {
        userId_ideaId: {
          userId,
          ideaId,
        },
      },
    });
  },


  getVoteStats: async (ideaId: string): Promise<IVoteStats> => {
    // Check if idea exists
    const idea = await prisma.idea.findUnique({
      where: { id: ideaId },
    });

    if (!idea) {
      throw new NotFound("Idea not found");
    }

    // Count upvotes and downvotes
    const [upvotesCount, downvotesCount] = await Promise.all([
      prisma.vote.count({
        where: {
          ideaId,
          type: VoteType.UP,
        },
      }),
      prisma.vote.count({
        where: {
          ideaId,
          type: VoteType.DOWN,
        },
      }),
    ]);

    return {
      upvotes: upvotesCount,
      downvotes: downvotesCount,
      total: upvotesCount - downvotesCount, // Net vote count
    };
  },

  /**
   * Check if a user has voted on an idea
   * @param userId - ID of the user
   * @param ideaId - ID of the idea
   * @returns Vote object if exists, null otherwise
   */
  getUserVote: async (userId: string, ideaId: string): Promise<IVoteResponse | null> => {
    const vote = await prisma.vote.findUnique({
      where: {
        userId_ideaId: {
          userId,
          ideaId,
        },
      },
    });

    return vote;
  },
};

export default voteService;