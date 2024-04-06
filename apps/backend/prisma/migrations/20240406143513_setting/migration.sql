-- CreateTable
CREATE TABLE "Setting" (
    "id" SERIAL NOT NULL,
    "rss_interval" INTEGER NOT NULL DEFAULT 7200,
    "downloader_host" TEXT NOT NULL,
    "downloader_username" TEXT NOT NULL,
    "downloader_password" TEXT NOT NULL,
    "downloader_path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);
