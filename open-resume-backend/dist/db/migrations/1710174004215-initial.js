"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initial1710174004215 = void 0;
class Initial1710174004215 {
    constructor() {
        this.name = 'Initial1710174004215';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "per_inf" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "objective" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "website" character varying NOT NULL, "location" character varying NOT NULL, CONSTRAINT "PK_2c8a482af9369d5e41dd983e420" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "education" ("id" SERIAL NOT NULL, "school" character varying NOT NULL, "date" date NOT NULL, "degree" character varying NOT NULL, "gpa" character varying NOT NULL, "additionalInformation" character varying NOT NULL, "resumeId" integer, CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "projectName" character varying NOT NULL, "date" date NOT NULL, "description" character varying NOT NULL, "resumeId" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_exp" ("id" SERIAL NOT NULL, "companyName" character varying NOT NULL, "jobTitle" character varying NOT NULL, "date" date NOT NULL, "description" character varying NOT NULL, "resumeId" integer, CONSTRAINT "PK_870bc6a338e7c5a73b8067b4427" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skills" ("id" SERIAL NOT NULL, "Skill" character varying NOT NULL, "Featured_Skill" integer NOT NULL, "resumeId" integer, CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "res_set" ("id" SERIAL NOT NULL, "themeColor" character varying NOT NULL, "fontSize" character varying NOT NULL, "documentSize" character varying NOT NULL, CONSTRAINT "PK_1086ebaec7819f0a8044ef9d622" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cus_sec" ("id" SERIAL NOT NULL, "Custom_Textbox" character varying NOT NULL, "resumeId" integer, CONSTRAINT "PK_dfe4d96cd638471ec14f8119cfa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "language" ("id" SERIAL NOT NULL, "languageName" character varying NOT NULL, "proficiency" character varying NOT NULL, "resumeId" integer, CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resume" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "resumename" character varying NOT NULL, CONSTRAINT "PK_7ff05ea7599e13fac01ac812e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying, "numtel" character varying, "companyname" character varying, "adresse" character varying, "role" "public"."user_entity_role_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9b998bada7cff93fcb953b0c37e" UNIQUE ("username"), CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "education" ADD CONSTRAINT "FK_0f65a811d17b239cbcd6afdcc58" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_18e486607478537bc9cf894bc2a" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_exp" ADD CONSTRAINT "FK_e78ba054498e22e0dc82499585c" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "skills" ADD CONSTRAINT "FK_9eefc978c93f6f730e27f5deeae" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cus_sec" ADD CONSTRAINT "FK_758b49e3ebe0d8049d83e7f7f6e" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "language" ADD CONSTRAINT "FK_d461521e55cf56e648410b218b3" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resume" ADD CONSTRAINT "FK_6543e24d4d8714017acd1a1b392" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "resume" DROP CONSTRAINT "FK_6543e24d4d8714017acd1a1b392"`);
        await queryRunner.query(`ALTER TABLE "language" DROP CONSTRAINT "FK_d461521e55cf56e648410b218b3"`);
        await queryRunner.query(`ALTER TABLE "cus_sec" DROP CONSTRAINT "FK_758b49e3ebe0d8049d83e7f7f6e"`);
        await queryRunner.query(`ALTER TABLE "skills" DROP CONSTRAINT "FK_9eefc978c93f6f730e27f5deeae"`);
        await queryRunner.query(`ALTER TABLE "work_exp" DROP CONSTRAINT "FK_e78ba054498e22e0dc82499585c"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_18e486607478537bc9cf894bc2a"`);
        await queryRunner.query(`ALTER TABLE "education" DROP CONSTRAINT "FK_0f65a811d17b239cbcd6afdcc58"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "resume"`);
        await queryRunner.query(`DROP TABLE "language"`);
        await queryRunner.query(`DROP TABLE "cus_sec"`);
        await queryRunner.query(`DROP TABLE "res_set"`);
        await queryRunner.query(`DROP TABLE "skills"`);
        await queryRunner.query(`DROP TABLE "work_exp"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "education"`);
        await queryRunner.query(`DROP TABLE "per_inf"`);
    }
}
exports.Initial1710174004215 = Initial1710174004215;
//# sourceMappingURL=1710174004215-initial.js.map