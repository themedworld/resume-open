import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1714257774618 implements MigrationInterface {
    name = 'Initial1714257774618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying, "numtel" character varying, "companyname" character varying, "adresse" character varying, "role" "public"."user_entity_role_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9b998bada7cff93fcb953b0c37e" UNIQUE ("username"), CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "per_inf" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "summary" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "url" character varying NOT NULL, "location" character varying NOT NULL, "resumeid" integer, CONSTRAINT "REL_559ac5e4b1ca200bdec3659c5d" UNIQUE ("resumeid"), CONSTRAINT "PK_2c8a482af9369d5e41dd983e420" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "education" ("id" SERIAL NOT NULL, "school" character varying NOT NULL, "date" character varying NOT NULL, "degree" character varying NOT NULL, "gpa" character varying NOT NULL, "descriptions" text array NOT NULL, "resumeid" integer, CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "project" character varying NOT NULL, "date" character varying NOT NULL, "descriptions" text array NOT NULL, "resumeid" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skills" ("id" SERIAL NOT NULL, "featuredSkills" jsonb NOT NULL, "descriptions" text array NOT NULL, "resumeid" integer, CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "res_set" ("id" SERIAL NOT NULL, "themeColor" character varying NOT NULL, "fontFamily" character varying NOT NULL, "documentSize" character varying NOT NULL, "fontSize" character varying NOT NULL, "resumeid" integer, CONSTRAINT "REL_a2fad43f324c9b0ff1a028a98c" UNIQUE ("resumeid"), CONSTRAINT "PK_1086ebaec7819f0a8044ef9d622" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cus_sec" ("id" SERIAL NOT NULL, "descriptions" text array NOT NULL, "resumeid" integer, CONSTRAINT "PK_dfe4d96cd638471ec14f8119cfa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "language" ("id" SERIAL NOT NULL, "language" character varying NOT NULL, "descriptions" text array NOT NULL, "resumeid" integer, CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photo" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "size" character varying NOT NULL, "fileUrl" character varying NOT NULL, "resumeid" integer, CONSTRAINT "REL_303d3eb4e38418ee513bc7093b" UNIQUE ("resumeid"), CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resume" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userid" integer, CONSTRAINT "PK_7ff05ea7599e13fac01ac812e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_exp" ("id" SERIAL NOT NULL, "company" character varying NOT NULL, "jobTitle" character varying NOT NULL, "date" character varying NOT NULL, "descriptions" text array NOT NULL, "resumeid" integer, CONSTRAINT "PK_870bc6a338e7c5a73b8067b4427" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "per_inf" ADD CONSTRAINT "FK_559ac5e4b1ca200bdec3659c5d0" FOREIGN KEY ("resumeid") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "education" ADD CONSTRAINT "FK_0cb2a45ec179734375fbb028d09" FOREIGN KEY ("resumeid") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_08c198048b5deb899d13597eb3d" FOREIGN KEY ("resumeid") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "skills" ADD CONSTRAINT "FK_f2d476dd8f3b065f7438a3ae4ef" FOREIGN KEY ("resumeid") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "res_set" ADD CONSTRAINT "FK_a2fad43f324c9b0ff1a028a98cc" FOREIGN KEY ("resumeid") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cus_sec" ADD CONSTRAINT "FK_6f4a719564451dc0a9f0d0bde75" FOREIGN KEY ("resumeid") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "language" ADD CONSTRAINT "FK_56b03fd5b7a8bd70432795651d7" FOREIGN KEY ("resumeid") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_303d3eb4e38418ee513bc7093b6" FOREIGN KEY ("resumeid") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resume" ADD CONSTRAINT "FK_043517ba146afe9bd660030caaa" FOREIGN KEY ("userid") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_exp" ADD CONSTRAINT "FK_f4c4935d8f2674cc7781d82ea8d" FOREIGN KEY ("resumeid") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_exp" DROP CONSTRAINT "FK_f4c4935d8f2674cc7781d82ea8d"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP CONSTRAINT "FK_043517ba146afe9bd660030caaa"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_303d3eb4e38418ee513bc7093b6"`);
        await queryRunner.query(`ALTER TABLE "language" DROP CONSTRAINT "FK_56b03fd5b7a8bd70432795651d7"`);
        await queryRunner.query(`ALTER TABLE "cus_sec" DROP CONSTRAINT "FK_6f4a719564451dc0a9f0d0bde75"`);
        await queryRunner.query(`ALTER TABLE "res_set" DROP CONSTRAINT "FK_a2fad43f324c9b0ff1a028a98cc"`);
        await queryRunner.query(`ALTER TABLE "skills" DROP CONSTRAINT "FK_f2d476dd8f3b065f7438a3ae4ef"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_08c198048b5deb899d13597eb3d"`);
        await queryRunner.query(`ALTER TABLE "education" DROP CONSTRAINT "FK_0cb2a45ec179734375fbb028d09"`);
        await queryRunner.query(`ALTER TABLE "per_inf" DROP CONSTRAINT "FK_559ac5e4b1ca200bdec3659c5d0"`);
        await queryRunner.query(`DROP TABLE "work_exp"`);
        await queryRunner.query(`DROP TABLE "resume"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`DROP TABLE "language"`);
        await queryRunner.query(`DROP TABLE "cus_sec"`);
        await queryRunner.query(`DROP TABLE "res_set"`);
        await queryRunner.query(`DROP TABLE "skills"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "education"`);
        await queryRunner.query(`DROP TABLE "per_inf"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
