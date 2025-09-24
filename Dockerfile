# Use a Node.js base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the NestJS application (if you have a build step)
# For production, you'll likely want to build your app first
RUN npm run build

# Expose the port your NestJS app listens on (default is 3000)
EXPOSE 3000

# Command to run the NestJS application
# For production, you'd typically run the compiled JavaScript
# CMD ["node", "dist/main"]
# If you want to run in development mode (e.g., with ts-node-dev), use:
CMD ["npm", "run", "start:dev"]
