# # 1. Use the base Node.js image
# FROM node:18

# # 2. Create app directory
# WORKDIR /app

# # 3. Copy package files and install dependencies
# COPY package*.json ./
# RUN npm install

# # 4. Copy the entire app source code
# COPY . .

# # 5. Set environment variables (override via docker-compose or CLI)
# ENV NODE_ENV=production

# # 6. Expose your service port (e.g. 3000)
# EXPOSE 3000

# # 7. Start the server
# CMD [ "npm", "start" ]
# Dockerfile

# 1. Use the base Node.js image
FROM node:18

# 2. Create app directory
WORKDIR /app

# 3. Copy package files and install dependencies
# This step leverages Docker's build cache. If package.json doesn't change,
# npm install won't re-run, speeding up subsequent builds.
COPY package*.json ./
RUN npm install

# 4. Copy the entire app source code
# This copies everything else needed for your application.
COPY . .

# 5. Set environment variables (override via docker-compose or CLI)
# Setting NODE_ENV to production optimizes Node.js for production.
# This can be overridden by a .env file or environment variables in docker-compose.
ENV NODE_ENV=production

# 6. Expose your service port (e.g. 5000)
# This informs Docker that the container listens on port 5000.
EXPOSE 5000

# 7. Start the server
# This is the command that runs when the container starts.
CMD [ "npm", "start" ]