FROM node:20-alpine AS base
ENV HUSKY=0
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune server --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm dlx turbo run build --filter=server
# install dependencies for production
RUN rm -rf node_modules
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
WORKDIR /app/apps/server
RUN pnpm exec prisma generate --generator client

FROM base AS runner
WORKDIR /app
RUN chmod 755 /app
COPY --from=installer /app .
WORKDIR /app/apps/server
RUN chmod +x docker-entrypoint.sh

ENV DATABASE_URL=file:/app/data/app.db
ENV NODE_ENV=production
ENV PORT=3001
VOLUME ["/app/data"]
EXPOSE 3001
ENTRYPOINT [ "./docker-entrypoint.sh" ]