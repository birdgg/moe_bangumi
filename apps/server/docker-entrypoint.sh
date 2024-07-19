#!/bin/sh
set -eu

echo "Generating prisma client"
npx prisma generate --generator client

echo "Run db migrate"
npx prisma migrate deploy

echo "Starting server"
node dist/main