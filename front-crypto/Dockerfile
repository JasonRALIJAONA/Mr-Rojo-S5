# Stage 1: Build the application
FROM node:18-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json from the root project directory
COPY front-crypto/package.json front-crypto/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code from the root project directory
COPY front-crypto .

# Build the application
RUN npm run build

# Stage 2: Serve the application with a lightweight web server
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose ports 80 and 3000
EXPOSE 80
# EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]