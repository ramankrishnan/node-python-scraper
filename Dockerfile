# Stage 1 - Scraping with Node.js and Puppeteer
FROM node:18-slim as scraper

# Install Chromium and dependencies
RUN apt-get update && apt-get install -y     chromium     fonts-liberation     libappindicator3-1     libasound2     libatk-bridge2.0-0     libatk1.0-0     libcups2     libdbus-1-3     libgdk-pixbuf2.0-0     libnspr4     libnss3     libx11-xcb1     libxcomposite1     libxdamage1     libxrandr2     xdg-utils     wget     --no-install-recommends &&     rm -rf /var/lib/apt/lists/*

# Set environment to skip Chromium download
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Set working directory
WORKDIR /app

# Copy and install Node dependencies
COPY package.json .
RUN npm install

# Copy scraper script
COPY scrape.js .

# Run scraper with URL (passed during build)
ARG SCRAPE_URL
ENV SCRAPE_URL=${SCRAPE_URL}
RUN node scrape.js

# Stage 2 - Python Flask Server
FROM python:3.10-slim as server

# Set working directory
WORKDIR /app

# Copy scraped data from previous stage
COPY --from=scraper /app/scraped_data.json ./

# Copy Flask server
COPY server.py ./
COPY requirements.txt ./

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 5000

# Start server
CMD ["python", "server.py"]
