-- CreateTable
CREATE TABLE "Bangumi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "origin_name" TEXT NOT NULL,
    "name_zh" TEXT,
    "name_jp" TEXT,
    "name_en" TEXT,
    "poster" TEXT NOT NULL,
    "season" INTEGER NOT NULL,
    "group" TEXT,
    "sub" TEXT,
    "dpi" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "num" INTEGER NOT NULL,
    "bangumi_id" INTEGER NOT NULL,
    "torrent" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Episode_bangumi_id_fkey" FOREIGN KEY ("bangumi_id") REFERENCES "Bangumi" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Bangumi_origin_name_season_idx" ON "Bangumi"("origin_name", "season");

-- CreateIndex
CREATE UNIQUE INDEX "Bangumi_origin_name_season_key" ON "Bangumi"("origin_name", "season");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_num_bangumi_id_key" ON "Episode"("num", "bangumi_id");
