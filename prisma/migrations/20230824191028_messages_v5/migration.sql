/*
  Warnings:

  - A unique constraint covering the columns `[userFirstId,userSecondId]` on the table `UserRelationship` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserRelationship_userFirstId_userSecondId_key" ON "UserRelationship"("userFirstId", "userSecondId");
