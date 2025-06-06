FROM node:slim

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /app

# Install OpenSSL 1.1 and dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends openssl libssl3 ca-certificates && \
    rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
