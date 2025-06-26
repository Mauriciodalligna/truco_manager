import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./user";
import { Score } from "./score";

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  date?: Date;

  @ManyToMany(() => User, { nullable: true })
  @JoinTable()
  users?: User[];

  @Column({ nullable: true })
  winnerName?: string;

  @OneToMany(() => Score, (score) => score.match, { cascade: true })
  scores?: Score[];

  constructor(id?: number, date?: Date, users?: User[], winnerName?: string) {
    (this.id = id),
      (this.date = date),
      (this.users = users),
      (this.winnerName = winnerName);
  }
}
