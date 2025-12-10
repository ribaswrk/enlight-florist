FROM node:20-slim AS base

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /app

# Install OpenSSL + CA certificates once for all stages
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl libssl3 ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install full dependency tree with lockfile for reproducible builds
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Build the Next.js app and run Prisma workflows
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate \
    && npx prisma migrate deploy \
    && npm run build \
    && npm run postbuild

# Strip devDependencies to keep the runtime image small
FROM build AS prod-deps
RUN npm prune --omit=dev

# Minimal runtime image
FROM base AS runner
WORKDIR /app

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "start"]
