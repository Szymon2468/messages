/*
  Warnings:

  - You are about to drop the `Invitation` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "RELATION_STATUS" ADD VALUE 'NO';

-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_userFromId_fkey";

-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_userToId_fkey";

-- AlterTable
ALTER TABLE "UserRelationship" ADD COLUMN     "sentInvitationDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Invitation";
