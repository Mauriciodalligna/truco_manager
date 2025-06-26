import { Router } from "express";
import { ScoreController } from "../controllers/scoreController";

const router = Router();
const scoreController = new ScoreController();

// Criar placar para uma partida
router.post("/score", scoreController.create);

// Buscar placar ativo
router.get("/score/active", scoreController.getActive);

// Buscar placar por partida
router.get("/score/match/:matchId", scoreController.getByMatch);

// Atualizar placar
router.put("/score/:id", scoreController.update);

// Finalizar placar
router.put("/score/:id/finish", scoreController.finish);

// Buscar histórico de placares
router.get("/scores", scoreController.getAll);

export default router;
