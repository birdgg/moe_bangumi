#!/bin/sh
set -eu

echo "Run db migrate"
npx prisma migrate deploy

echo "Starting server"
node dist/main