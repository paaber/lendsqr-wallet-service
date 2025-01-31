# Dockerfile

# Use the base Node.js image
FROM node:20-buster-slim

# Set a UTF-8 locale, install locales and OpenSSL in a single command
RUN apt-get update && \
    apt-get install -y locales openssl && \
    sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    locale-gen && \
    update-locale LANG=en_US.UTF-8



WORKDIR /usr/src/app

RUN npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000

# Install nodemon globally
RUN npm install -g nodemon

COPY package.json .

RUN npm install --verbose

COPY . .


# Run Prisma generate during the Docker image build
RUN npx prisma generate

RUN npm run build
RUN echo "Listing dist directory contents"
RUN ls -la /usr/src/app/dist

EXPOSE 3000  

# Set default NODE_ENV to production if not set
ENV NODE_ENV=${NODE_ENV:-production}

# CMD ["bash", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev; else npm start; fi"]
