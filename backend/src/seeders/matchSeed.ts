import { appDataSource } from "../data-source";
import { Match } from "../entities/match";
import { User } from "../entities/user";
import { faker } from "@faker-js/faker";

export class MatchSeed {
  public static async seed(): Promise<void> {
    if (!appDataSource.isInitialized) {
      await appDataSource.initialize();
    }

    const matchRepository = appDataSource.getRepository(Match);
    const userRepository = appDataSource.getRepository(User);

    // Buscar alguns usuários existentes
    const users = await userRepository.find({ take: 8 });

    if (users.length < 4) {
      console.log("Precisa de pelo menos 4 usuários para criar partidas");
      return;
    }

    const matchCount = 10;
    for (let i = 0; i < matchCount; i++) {
      // Selecionar 4 jogadores aleatórios
      const shuffledUsers = users.sort(() => 0.5 - Math.random());
      const selectedUsers = shuffledUsers.slice(0, 4);

      // 70% das partidas têm vencedor
      const hasWinner = Math.random() > 0.3;
      const winner = hasWinner ? selectedUsers[Math.floor(Math.random() * selectedUsers.length)] : undefined;

      const match = matchRepository.create({
        date: faker.date.recent({ days: 30 }),
        users: selectedUsers,
        winnerName: winner ? winner.name : undefined,
      });

      await matchRepository.save(match);
    }

    console.log("Matches seeded successfully!");
  }
}
