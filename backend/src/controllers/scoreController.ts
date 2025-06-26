import { Request, Response } from "express";
import { appDataSource } from "../data-source";
import ScoreRepository from "../repositories/scoreRepository";
import { Score } from "../entities/score";
import { Match } from "../entities/match";

export class ScoreController {
  private scoreRepository: ScoreRepository;

  constructor() {
    this.scoreRepository = new ScoreRepository(appDataSource);
  }

  // Criar placar para uma partida
  create = async (req: Request, res: Response) => {
    try {
      const { matchId } = req.body;

      const score = new Score();
      score.match = { id: matchId } as Match;
      score.team1Score = 0;
      score.team2Score = 0;
      score.isActive = true;

      const newScore = await this.scoreRepository.create(score);
      res.status(201).json(newScore);
    } catch (error) {
      console.error("Erro ao criar placar:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };

  // Buscar placar ativo
  getActive = async (req: Request, res: Response) => {
    try {
      const activeScore = await this.scoreRepository.getActiveScore();
      if (activeScore) {
        res.status(200).json(activeScore);
      } else {
        res.status(404).json({ message: "Nenhum placar ativo encontrado" });
      }
    } catch (error) {
      console.error("Erro ao buscar placar ativo:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };

  // Buscar placar por partida
  getByMatch = async (req: Request, res: Response) => {
    try {
      const { matchId } = req.params;
      const score = await this.scoreRepository.getByMatchId(parseInt(matchId));

      if (score) {
        res.status(200).json(score);
      } else {
        res.status(404).json({ message: "Placar não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao buscar placar:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };

  // Atualizar placar
  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { team1Score, team2Score } = req.body;

      const updatedScore = await this.scoreRepository.updateScore(
        parseInt(id),
        team1Score,
        team2Score
      );

      if (updatedScore) {
        res.status(200).json(updatedScore);
      } else {
        res.status(404).json({ message: "Placar não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao atualizar placar:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };

  // Finalizar placar
  finish = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { winner } = req.body;

      const finishedScore = await this.scoreRepository.finishScore(
        parseInt(id),
        winner
      );

      if (finishedScore) {
        res.status(200).json(finishedScore);
      } else {
        res.status(404).json({ message: "Placar não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao finalizar placar:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };

  // Buscar histórico de placares
  getAll = async (req: Request, res: Response) => {
    try {
      const scores = await this.scoreRepository.getAllScores();
      res.status(200).json(scores);
    } catch (error) {
      console.error("Erro ao buscar placares:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };
}
