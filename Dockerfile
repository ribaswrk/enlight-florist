# Base image
FROM node:18

# Build-time argument to detect environment
ARG NODE_ENV=production

# Set environment variable inside container
ENV NODE_ENV=$NODE_ENV

WORKDIR /app

# Copy only what's needed first
COPY package.json package-lock.json ./

RUN npm install

# Copy full app after dependencies
COPY . .

# Generate Prisma client inside the container
RUN npx prisma generate

# Build Next.js for production
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; 

# Expose port
EXPOSE 3000

# Run appropriate command based on env
CMD if [ "$NODE_ENV" = "production" ]; then npm start; else npm run dev;
