import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Initial1710174004215 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
