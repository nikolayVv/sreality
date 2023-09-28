# Pull base image
FROM node:18-alpine

# Set work directory
WORKDIR /usr/src/app

# Install Chromium dependencies
RUN apk --no-cache add \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set an environment variable to let Puppeteer know where Chromium is located
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copy and intall libraries
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]