// Tipos globais para o frontend

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
}

export interface Match {
  id?: number;
  date?: string | Date;
  users?: User[];
  winnerName?: string;
}

export interface ApiMatch {
  id?: number;
  date?: string | Date;
  users?: number[];
  winnerName?: string;
}

export interface Score {
  id?: number;
  match?: Match;
  team1Score: number;
  team2Score: number;
  isActive: boolean;
  winner?: string;
  createdAt?: Date;
  finishedAt?: Date;
}

export interface ActiveGame {
  id?: number;
  match?: Match;
  team1Score: number;
  team2Score: number;
  isActive: boolean;
}

export interface DashboardStats {
  totalUsers: number;
  totalMatches: number;
  activeMatches: number;
  completedMatches: number;
}

export interface Dupla {
  jogador1: User;
  jogador2: User;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Tipos para formulários
export interface UserFormData {
  name: string;
  email: string;
  password: string;
}

export interface MatchFormData {
  users: number[];
  date: string;
}

export interface ScoreFormData {
  team1Score: number;
  team2Score: number;
}
