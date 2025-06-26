import { DataSource, Repository } from "typeorm";
import { Score } from "../entities/score";
import { Match } from "../entities/match";

class ScoreRepository {
  private repository: Repository<Score>;
  private matchRepository: Repository<Match>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Score);
    this.matchRepository = dataSource.getRepository(Match);
  }

  async create(score: Omit<Score, "id">): Promise<Score> {
    const newScore = this.repository.create(score);
    return this.repository.save(newScore);
  }

  async getByMatchId(matchId: number): Promise<Score | undefined> {
    const score = await this.repository.findOne({
      where: { match: { id: matchId } },
      relations: ["match", "match.users"],
    });
    return score || undefined;
  }

  async getActiveScore(): Promise<Score | undefined> {
    const score = await this.repository.findOne({
      where: { isActive: true },
      relations: ["match", "match.users"],
    });
    return score || undefined;
  }

  async updateScore(
    id: number,
    team1Score: number,
    team2Score: number
  ): Promise<Score | undefined> {
    const score = await this.repository.findOneBy({ id });
    if (!score) return undefined;

    score.team1Score = team1Score;
    score.team2Score = team2Score;

    // Verificar se alguém ganhou (12 pontos)
    if (team1Score >= 12 || team2Score >= 12) {
      score.isActive = false;
      score.winner = team1Score >= 12 ? "Dupla 1" : "Dupla 2";
      score.finishedAt = new Date();

      // Atualizar a partida com o vencedor
      if (score.match?.id) {
        const match = await this.matchRepository.findOneBy({
          id: score.match.id,
        });
        if (match) {
          match.winnerName = score.winner;
          await this.matchRepository.save(match);
        }
      }
    }

    return this.repository.save(score);
  }

  async finishScore(id: number, winner: string): Promise<Score | undefined> {
    const score = await this.repository.findOneBy({ id });
    if (!score) return undefined;

    score.isActive = false;
    score.winner = winner;
    score.finishedAt = new Date();

    // Atualizar a partida com o vencedor
    if (score.match?.id) {
      const match = await this.matchRepository.findOneBy({
        id: score.match.id,
      });
      if (match) {
        match.winnerName = winner;
        await this.matchRepository.save(match);
      }
    }

    return this.repository.save(score);
  }

  async getAllScores(): Promise<Score[]> {
    return this.repository.find({
      relations: ["match", "match.users"],
      order: { createdAt: "DESC" },
    });
  }
}

export default ScoreRepository;
