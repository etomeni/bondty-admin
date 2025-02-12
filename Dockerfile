# Step 1: Use a node base image to install dependencies and build the app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if you have one) to the container
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite app for production
RUN npm run build

# Step 2: Serve the app using a web server (e.g., nginx or serve)
FROM nginx:alpine

# Copy the build output from the previous stage to the nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default port for nginx
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]