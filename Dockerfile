FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache build-base
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

FROM node:20-alpine AS deps
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

FROM node:20-alpine AS runner
WORKDIR /app
RUN addgroup -S app && adduser -S -G app app

ENV NODE_ENV=prod

COPY --from=deps --chown=app:app /app/node_modules ./node_modules
COPY --from=builder --chown=app:app /app/dist ./dist

EXPOSE 3000
USER app
CMD ["node", "dist/main.js"]
