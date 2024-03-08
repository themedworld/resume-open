"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initial1709425445279 = void 0;
class Initial1709425445279 {
    constructor() {
        this.name = 'Initial1709425445279';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."user_entity_role_enum" AS ENUM('recruteur', 'demandeur')`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying, "numtel" character varying, "companyname" character varying, "adresse" character varying, "role" "public"."user_entity_role_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9b998bada7cff93fcb953b0c37e" UNIQUE ("username"), CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TYPE "public"."user_entity_role_enum"`);
    }
}
exports.Initial1709425445279 = Initial1709425445279;
//# sourceMappingURL=1709425445279-initial.js.map