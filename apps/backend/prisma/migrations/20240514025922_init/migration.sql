-- CreateTable
CREATE TABLE "Bangumi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name_zh" TEXT NOT NULL,
    "name_jp" TEXT,
    "name_en" TEXT,
    "poster" TEXT NOT NULL DEFAULT 'default',
    "season" INTEGER NOT NULL DEFAULT 1,
    "year" INTEGER,
    "group" TEXT,
    "sub" TEXT,
    "dpi" TEXT,
    "source" TEXT,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "offset" INTEGER NOT NULL DEFAULT 0,
    "save_path" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "episode" INTEGER NOT NULL,
    "bangumi_id" INTEGER NOT NULL,
    "torrent" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Episode_bangumi_id_fkey" FOREIGN KEY ("bangumi_id") REFERENCES "Bangumi" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Bangumi_name_zh_season_key" ON "Bangumi"("name_zh", "season");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_bangumi_id_episode_key" ON "Episode"("bangumi_id", "episode");
