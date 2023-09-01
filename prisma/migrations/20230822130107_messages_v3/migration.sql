-- CreateEnum
CREATE TYPE "RELATION_STATUS" AS ENUM ('PENDING_FIRST_SECOND', 'PENDING_SECOND_FIRST', 'FRIENDS', 'BLOCK_FIRST_SECOND', 'BLOCK_SECOND_FIRST', 'BLOCK_BOTH');

-- CreateTable
CREATE TABLE "UserRelationship" (
    "userFirstId" INTEGER NOT NULL,
    "userSecondId" INTEGER NOT NULL,
    "relationStatus" "RELATION_STATUS" NOT NULL,

    CONSTRAINT "UserRelationship_pkey" PRIMARY KEY ("userFirstId","userSecondId")
);

-- AddForeignKey
ALTER TABLE "UserRelationship" ADD CONSTRAINT "UserRelationship_userFirstId_fkey" FOREIGN KEY ("userFirstId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRelationship" ADD CONSTRAINT "UserRelationship_userSecondId_fkey" FOREIGN KEY ("userSecondId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
