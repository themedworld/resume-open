import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Initial1715076010384 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
