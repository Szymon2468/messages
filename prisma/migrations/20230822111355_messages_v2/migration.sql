/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Invitation" (
    "id" SERIAL NOT NULL,
    "userFromId" INTEGER NOT NULL,
    "userToId" INTEGER NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_userFromId_fkey" FOREIGN KEY ("userFromId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_userToId_fkey" FOREIGN KEY ("userToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
