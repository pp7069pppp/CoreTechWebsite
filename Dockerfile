# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose both frontend and backend ports
EXPOSE 5000
EXPOSE 3000

# Start both frontend and backend
CMD ["npm", "start"]