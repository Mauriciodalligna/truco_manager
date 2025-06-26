import { MigrationInterface, QueryRunner } from "typeorm";

export class FixCascadeDelete1730423732328 implements MigrationInterface {
    name = 'FixCascadeDelete1730423732328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Remover a constraint de chave estrangeira existente
        await queryRunner.query(`ALTER TABLE "score" DROP CONSTRAINT "FK_8516f538d56c2292d9d3f238a5a"`);
        
        // Recriar com CASCADE DELETE
        await queryRunner.query(`ALTER TABLE "score" ADD CONSTRAINT "FK_8516f538d56c2292d9d3f238a5a" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover a constraint com CASCADE
        await queryRunner.query(`ALTER TABLE "score" DROP CONSTRAINT "FK_8516f538d56c2292d9d3f238a5a"`);
        
        // Recriar sem CASCADE (voltar ao estado original)
        await queryRunner.query(`ALTER TABLE "score" ADD CONSTRAINT "FK_8516f538d56c2292d9d3f238a5a" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
} 