-- CreateTable
CREATE TABLE "Bangumi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name_zh" TEXT NOT NULL,
    "name_jp" TEXT,
    "name_en" TEXT,
    "poster" TEXT NOT NULL DEFAULT 'default',
    "season" INTEGER NOT NULL DEFAULT 1,
    "group" TEXT,
    "sub" TEXT,
    "dpi" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Bangumi_name_zh_season_key" ON "Bangumi"("name_zh", "season");
