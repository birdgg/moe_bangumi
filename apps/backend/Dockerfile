FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
RUN apk update
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=backend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/turbo.json ./turbo.json
COPY --from=builder /app/apps/backend/prisma ./prisma
RUN pnpm install --frozen-lockfile
RUN pnpm dlx prisma generate 


FROM base AS sourcer
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
RUN pnpm dlx turbo run build --scope=backend --include-dependencies --no-deps

FROM base as runner
WORKDIR /app
COPY --from=sourcer /app/ .
ENV NODE_ENV production
CMD [ "node", "apps/backend/dist/main.js" ]