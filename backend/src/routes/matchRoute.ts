import express from "express";
import { MatchController } from "../controllers/matchController";

const matchController = new MatchController();
const router = express.Router();

router.post("/match", matchController.create);
router.get("/matches", matchController.getMatches);
router.get("/currentmatches", matchController.getCurrentMatches);
router.put("/match/:id", matchController.updateMatch);
router.delete("/match/:id", matchController.deleteMatch);
router.get("/matches/active", matchController.getActiveMatches);

export default router;
