# Build stage
FROM node:lts-alpine AS build

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Use a lightweight production image
FROM node:lts-alpine AS production

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built application from builder
COPY --from=build /app/dist /app

# Expose the application port
EXPOSE 3005

# Serve the built application
CMD ["serve", "-s", "/app", "-l", "3005"]
