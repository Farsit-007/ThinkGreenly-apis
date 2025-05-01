import { VoteType } from "@prisma/client";

export type IVotePayload = {
  ideaId: string;
  type: VoteType;
};

export type IVoteResponse = {
  id: string;
  userId: string;
  ideaId: string;
  type: VoteType;
};

export type IVoteStats = {
  upvotes: number;
  downvotes: number;
  total: number;
};