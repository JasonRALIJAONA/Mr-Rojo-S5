# Stage 1: Build the application
FROM node:18-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json
COPY front-crypto/package.json front-crypto/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY front-crypto .

# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy custom Nginx configuration
COPY front-crypto/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built application
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]