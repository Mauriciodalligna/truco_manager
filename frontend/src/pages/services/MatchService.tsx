import axios from "axios";

const url = "http://localhost:3002/api";

interface User {
  id?: number;
  name?: string;
  email?: string;
}

interface Match {
  id?: number;
  date?: Date;
  users?: User[];
  winnerName?: string;
}

interface ApiMatch {
  id?: number;
  date?: string | Date;
  users?: number[];
  winnerName?: string;
}

class MatchService {
  async createMatch(match: ApiMatch) {
    return axios
      .post(`${url}/match`, match)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Erro ao criar partida:", error);
        throw error;
      });
  }

  async getAllMatches() {
    return axios
      .get(`${url}/matches`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Erro ao buscar partidas:", error);
        return [];
      });
  }

  async getCurrentMatches() {
    return axios
      .get(`${url}/currentmatches`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Erro ao buscar partidas atuais:", error);
        return [];
      });
  }

  async updateMatch(id: number, match: ApiMatch) {
    return axios
      .put(`${url}/match/${id}`, match)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Erro ao atualizar partida:", error);
        throw error;
      });
  }

  async deleteMatch(id: number) {
    return axios
      .delete(`${url}/match/${id}`)
      .then((response) => response.status === 204)
      .catch((error) => {
        console.error("Erro ao excluir partida:", error);
        throw error;
      });
  }

  async getActiveMatches() {
    return axios
      .get(`${url}/matches/active`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Erro ao buscar partidas em andamento:", error);
        return [];
      });
  }
}

export default new MatchService();
