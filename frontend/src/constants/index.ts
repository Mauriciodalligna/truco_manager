// Constantes globais do frontend

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  USERS: "/usuarios",
  MATCHES: "/partidas",
  SCORE: "/placar",
  ABOUT: "/sobre",
} as const;

export const GAME_CONSTANTS = {
  WINNING_SCORE: 12,
  MAX_PLAYERS_PER_MATCH: 4,
} as const;

export const MESSAGES = {
  SUCCESS: {
    MATCH_CREATED: "Partida criada com sucesso!",
    MATCH_UPDATED: "Partida atualizada com sucesso!",
    MATCH_DELETED: "Partida excluída com sucesso!",
    USER_CREATED: "Usuário criado com sucesso!",
    USER_UPDATED: "Usuário atualizado com sucesso!",
    USER_DELETED: "Usuário excluído com sucesso!",
    SCORE_UPDATED: "Placar atualizado com sucesso!",
    GAME_FINISHED: "Partida finalizada com sucesso!",
  },
  ERROR: {
    LOADING_USERS: "Erro ao carregar usuários",
    LOADING_MATCHES: "Erro ao carregar partidas",
    LOADING_SCORES: "Erro ao carregar placares",
    CREATING_MATCH: "Erro ao criar partida",
    UPDATING_MATCH: "Erro ao atualizar partida",
    DELETING_MATCH: "Erro ao excluir partida",
    CREATING_USER: "Erro ao criar usuário",
    UPDATING_USER: "Erro ao atualizar usuário",
    DELETING_USER: "Erro ao excluir usuário",
    UPDATING_SCORE: "Erro ao atualizar placar",
    FINISHING_GAME: "Erro ao finalizar partida",
    LOGIN_FAILED: "Erro ao fazer login. Tente novamente.",
  },
} as const;
