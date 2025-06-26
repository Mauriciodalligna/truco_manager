import axios from "axios";
import { Score, ActiveGame, ScoreFormData } from "../types";
import { API_BASE_URL } from "../constants";

const url = "http://localhost:3002/api";

interface CreateScoreRequest {
  matchId: number;
}

interface UpdateScoreRequest {
  team1Score: number;
  team2Score: number;
}

class ScoreService {
  async createScore(data: CreateScoreRequest): Promise<Score> {
    return axios
      .post(`${url}/score`, data)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Erro ao criar placar:", error);
        throw error;
      });
  }

  async getActiveScore(): Promise<Score | null> {
    return axios
      .get(`${url}/score/active`)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response?.status === 404) {
          // Não há placar ativo, isso é normal
          return null;
        }
        console.error("Erro ao buscar placar ativo:", error);
        return null;
      });
  }

  async getScoreByMatch(matchId: number): Promise<Score | null> {
    return axios
      .get(`${url}/score/match/${matchId}`)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response?.status === 404) {
          // Não há placar para esta partida, isso é normal
          return null;
        }
        console.error("Erro ao buscar placar da partida:", error);
        return null;
      });
  }

  async updateScore(id: number, data: UpdateScoreRequest): Promise<Score> {
    return axios
      .put(`${url}/score/${id}`, data)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Erro ao atualizar placar:", error);
        throw error;
      });
  }

  async finishScore(id: number, winner: string): Promise<Score> {
    return axios
      .put(`${url}/score/${id}/finish`, { winner })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Erro ao finalizar placar:", error);
        throw error;
      });
  }

  async getAllScores(): Promise<Score[]> {
    return axios
      .get(`${url}/scores`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Erro ao buscar placares:", error);
        return [];
      });
  }
}

export default new ScoreService();
