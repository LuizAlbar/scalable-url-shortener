FROM node:20-alpine AS builder

WORKDIR /app
RUN apk add --no-cache build-base

RUN corepack enable

COPY package.json pnpm-lock.yaml nest-cli.json tsconfig*.json ./
RUN pnpm install --frozen-lockfile

COPY src ./src

RUN pnpm exec nest build --config tsconfig.build.json


FROM node:20-alpine AS runner

WORKDIR /app
RUN addgroup -S app && adduser -S -G app app

RUN corepack enable

ENV NODE_ENV=dev \
    PORT=3000

COPY --from=builder --chown=app:app /app/node_modules ./node_modules
COPY --from=builder --chown=app:app /app/dist ./dist
COPY --from=builder --chown=app:app /app/package.json ./

EXPOSE 3000

USER app

CMD ["node", "dist/main.js"]
