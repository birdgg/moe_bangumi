-- CreateEnum
CREATE TYPE "Sub" AS ENUM ('CHS', 'CHT', 'JP');

-- CreateTable
CREATE TABLE "Bangumi" (
    "id" SERIAL NOT NULL,
    "name_zh" TEXT NOT NULL,
    "name_jp" TEXT,
    "name_en" TEXT,
    "poster" TEXT NOT NULL DEFAULT 'default',
    "season" INTEGER NOT NULL DEFAULT 1,
    "year" INTEGER,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "offset" INTEGER NOT NULL DEFAULT 0,
    "save_path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Bangumi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bangumi_id" INTEGER NOT NULL,
    "episode" INTEGER NOT NULL,
    "sub" "Sub" NOT NULL,
    "source" TEXT,
    "dpi" TEXT NOT NULL,
    "torrent" TEXT NOT NULL,
    "save_path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bangumi_name_zh_season_key" ON "Bangumi"("name_zh", "season");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_bangumi_id_episode_key" ON "Episode"("bangumi_id", "episode");

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_bangumi_id_fkey" FOREIGN KEY ("bangumi_id") REFERENCES "Bangumi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
