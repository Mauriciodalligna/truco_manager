import { appDataSource } from "../data-source";
import MatchRepository from "../repositories/matchRepository";
import { Request, Response } from "express";
import UserRepository from "../repositories/userRepository";
import User from "../entities/user";
import { Match } from "../entities/match";

export class MatchController {
  private matchRepository: MatchRepository;

    constructor() {
    this.matchRepository = new MatchRepository(appDataSource);
    }

  create = async (req: Request, res: Response) => {
    const userRepo = new UserRepository(appDataSource);
    const userIds = req.body.users;

    const users = await userRepo.getBy(userIds);

    const date = new Date();
    const match = new Match();
    match.date = date;
    match.users = users;

    const newMatch = await this.matchRepository.create(match);
    res.status(201).json(newMatch);
  };

    getMatches = async (req: Request, res: Response) => {
    const matches = await this.matchRepository.getAll();
    res.status(200).json(matches);
  };

    getCurrentMatches = async (req: Request, res: Response) => {
    const matches = await this.matchRepository.getCount();
    res.status(200).json({ message: matches });
  };

    deleteMatch = async (req: Request, res: Response) => { 
    const id = req.params.id;
    const result = await this.matchRepository.delete(parseInt(id));
    if (!result) res.status(500).send("Deu erro!");

    res.status(204).send("Partida deletada");
  };

    updateMatch = async (req: Request, res: Response) => {
    const id = req.params.id;
    const winner = req.body.winner;
    const match = await this.matchRepository.getById(+id);
    if (!match) {
      res.status(404).json({ message: "Partida não encontrada" });
        }

    match!.winnerName = winner;
    const matchUpdated = await this.matchRepository.updateMatch(+id, match!);
        if (!matchUpdated) {
      res.status(500).json({ message: "Erro interno" });
        }
    const resultado = this.matchRepository.save(matchUpdated!);

    if (!resultado) {
      res.status(500).json({ message: "Erro interno" });
        }

    res.status(200).json({ message: "Partida alterada" });
  };

  // Buscar partidas em andamento
  getActiveMatches = async (req: Request, res: Response) => {
    try {
      const activeMatches = await this.matchRepository.getActiveMatches();
      res.status(200).json(activeMatches);
    } catch (error) {
      console.error("Erro ao buscar partidas em andamento:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };
}
