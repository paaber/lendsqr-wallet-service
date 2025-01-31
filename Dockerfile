# Use an official lightweight Node.js image
FROM node:20-buster-slim

# Set locale and install necessary dependencies
RUN apt-get update && \
    apt-get install -y locales openssl && \
    sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    locale-gen && \
    update-locale LANG=en_US.UTF-8

# Set working directory
WORKDIR /usr/src/app

# Optimize npm retry settings for better stability
RUN npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000

# Install nodemon globally for development mode
RUN npm install -g nodemon

# Copy package.json and package-lock.json before copying the full source
COPY package*.json ./

# Install dependencies
RUN npm install --verbose

# Copy the rest of the project files
COPY . .

# Build TypeScript files
RUN npm run build

# Expose the application port
EXPOSE 3000  

# Set default environment variable
ENV NODE_ENV=${NODE_ENV:-development}

# Ensure Knex migrations are applied before starting
CMD ["bash", "-c", "npx knex migrate:latest && if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev; else npm start; fi"]
