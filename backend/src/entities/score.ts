import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Match } from "./match";

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Match, { nullable: false })
  match?: Match;

  @Column({ nullable: false })
  team1Score: number = 0;

  @Column({ nullable: false })
  team2Score: number = 0;

  @Column({ nullable: false })
  isActive: boolean = true;

  @Column({ nullable: true })
  winner?: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @Column({ type: "timestamp", nullable: true })
  finishedAt?: Date;

  constructor(
    id?: number,
    match?: Match,
    team1Score: number = 0,
    team2Score: number = 0,
    isActive: boolean = true,
    winner?: string,
    createdAt?: Date,
    finishedAt?: Date
  ) {
    this.id = id;
    this.match = match;
    this.team1Score = team1Score;
    this.team2Score = team2Score;
    this.isActive = isActive;
    this.winner = winner;
    this.createdAt = createdAt;
    this.finishedAt = finishedAt;
  }
}
