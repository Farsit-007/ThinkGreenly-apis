import express from "express";
import {voteController} from "./vote.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  deleteVoteValidationSchema,
  getVoteStatsValidationSchema,
  voteValidationSchema
} from "./vote.validation";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  auth("MEMBER"), 
  validateRequest(voteValidationSchema),
  voteController.createOrUpdateVote
);

router.delete(
  "/:ideaId",
  auth("MEMBER"),
  validateRequest(deleteVoteValidationSchema),
  voteController.removeVote
);

router.get(
  "/stats/:ideaId",
  validateRequest(getVoteStatsValidationSchema),
  voteController.getVoteStats
);

router.get(
  "/:ideaId",
  auth("MEMBER"),
  validateRequest(getVoteStatsValidationSchema),
  voteController.getUserVote
);

export const voteRoutes = router;