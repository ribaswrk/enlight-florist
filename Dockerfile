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
RUN npm ci --include=dev

# Generate Prisma Client and build the Next.js app.
# Apply database migrations when the container starts, after runtime environment loads.
FROM base AS build
ENV DATABASE_URL=mysql://build:build@127.0.0.1:3306/build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate \
    && npm run build \
    && npm run postbuild

# Strip devDependencies to keep the runtime image small
FROM build AS prod-deps
RUN npm prune --omit=dev

# Minimal runtime image
FROM base AS runner
WORKDIR /app

COPY --from=build /app/next.config.ts ./
COPY --from=build /app/prisma.config.ts ./
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/app/generated/prisma ./app/generated/prisma

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
