import { DataSource, Repository } from "typeorm"
import { Match } from "../entities/match"


class MatchRepository implements MatchRepository {

    private repository: Repository<Match>

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(Match)
    }

    async create(match: Omit<Match, 'id'>): Promise<Match> {
        const newMatch = await this.repository.create(match)
        return this.repository.save(newMatch)
    }

    async getAll(): Promise<Match[]> {
        const matches = await this.repository.find()
        return matches
    }

    async getCount(): Promise<number> {
        const matches = await this.repository.count()
        return matches
    }

    async getById(id: number): Promise<Match | undefined> {
        const match = await this.repository.findOneBy({id})
        return match || undefined
    }

    async updateMatch(id: number, match: Omit<Match, 'id'>): Promise<Match | undefined> {
        const matchToUpdate = await this.getById(id)
        if (!matchToUpdate) {
            return undefined
        }
        return this.repository.merge(matchToUpdate, match)
    }

    async save(match: Omit<Match, 'id'>): Promise<boolean> {
        const result = await this.repository.save(match)
        return result ? true : false
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id)
        return result?.affected ? result.affected > 0 : false
    }

}

export default MatchRepository