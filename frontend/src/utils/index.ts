// Utilitários globais do frontend

import { User, Match } from "../types";

export const formatDate = (dateInput?: string | Date): string => {
  if (!dateInput) return "Data não informada";

  try {
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;

    if (isNaN(date.getTime())) {
      return "Data inválida";
    }

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Erro ao formatar data:", error);
    return "Data inválida";
  }
};

export const getPlayerNames = (users?: User[]): string => {
  if (!users || users.length === 0) return "Jogadores não definidos";

  const names = users
    .map((user) => {
      if (user.name && user.name.trim() !== "") {
        return user.name;
      }
      if (user.email && user.email.trim() !== "") {
        return user.email;
      }
      return `Jogador ${user.id}`;
    })
    .filter((name) => name && name.trim() !== "");

  return names.length > 0 ? names.join(", ") : "Nenhum jogador";
};

export const getDuplaNames = (users?: User[]) => {
  if (!users || users.length < 4)
    return { dupla1: "Dupla 1", dupla2: "Dupla 2" };

  const dupla1 = users
    .slice(0, 2)
    .map((user) => user.name || user.email)
    .join(" & ");
  const dupla2 = users
    .slice(2, 4)
    .map((user) => user.name || user.email)
    .join(" & ");

  return {
    dupla1: dupla1 || "Dupla 1",
    dupla2: dupla2 || "Dupla 2",
  };
};

export const isMatchActive = (match: Match): boolean => {
  return !match.winnerName;
};

export const isMatchCompleted = (match: Match): boolean => {
  return !!match.winnerName;
};

export const getMatchStatus = (match: Match): "active" | "completed" => {
  return isMatchActive(match) ? "active" : "completed";
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};
