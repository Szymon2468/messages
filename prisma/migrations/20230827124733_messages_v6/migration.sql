/*
  Warnings:

  - The values [NO] on the enum `RELATION_STATUS` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RELATION_STATUS_new" AS ENUM ('PENDING_FIRST_SECOND', 'PENDING_SECOND_FIRST', 'FRIENDS', 'BLOCK_FIRST_SECOND', 'BLOCK_SECOND_FIRST', 'BLOCK_BOTH');
ALTER TABLE "UserRelationship" ALTER COLUMN "relationStatus" TYPE "RELATION_STATUS_new" USING ("relationStatus"::text::"RELATION_STATUS_new");
ALTER TYPE "RELATION_STATUS" RENAME TO "RELATION_STATUS_old";
ALTER TYPE "RELATION_STATUS_new" RENAME TO "RELATION_STATUS";
DROP TYPE "RELATION_STATUS_old";
COMMIT;
