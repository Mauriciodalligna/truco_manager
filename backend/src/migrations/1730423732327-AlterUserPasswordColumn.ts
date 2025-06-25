import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserPasswordColumn1730423732327 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "users", "password",
            new TableColumn({ name: "password",  type: "varchar" })
        );
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "users", "password",
            new TableColumn({ name: "password", type: "int" })
        );
    }

}
