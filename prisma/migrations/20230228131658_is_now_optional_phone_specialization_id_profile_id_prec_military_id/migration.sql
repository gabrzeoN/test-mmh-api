-- DropForeignKey
ALTER TABLE "professionals" DROP CONSTRAINT "professionals_specializationId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_profileId_fkey";

-- AlterTable
ALTER TABLE "professionals" ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "isEmailConfirmed" SET DEFAULT false,
ALTER COLUMN "specializationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "isEmailConfirmed" SET DEFAULT false,
ALTER COLUMN "profileId" DROP NOT NULL,
ALTER COLUMN "prec" DROP NOT NULL,
ALTER COLUMN "militaryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "professionals" ADD CONSTRAINT "professionals_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "specializations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
