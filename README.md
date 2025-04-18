# Node.js + Python Web Scraper

This project uses Node.js (with Puppeteer) to scrape data from a given URL, and Python (with Flask) to host the scraped content.

## 🧩 Components

- `scrape.js`: Scrapes page title and first heading from a website using Puppeteer.
- `server.py`: Flask app that serves the scraped data as JSON.
- `Dockerfile`: Multi-stage build combining Node.js scraping and Python hosting.

## 🚀 How to Build and Run

### 1. Build the Docker Image

```bash
docker build --build-arg SCRAPE_URL=https://example.com -t scraper-app .
```

### 2. Run the Container

```bash
docker run -p 5000:5000 scraper-app
```

### 3. Access the Scraped Data

Open browser and go to: [http://localhost:5000](http://localhost:5000)

You’ll see JSON output like:

```json
{
  "title": "Example Domain",
  "heading": "Example Domain"
}
```

## 📄 Files

- `scrape.js`: Puppeteer script.
- `server.py`: Flask API server.
- `Dockerfile`: Multi-stage build.
- `package.json`: Node dependencies.
- `requirements.txt`: Python dependencies.
