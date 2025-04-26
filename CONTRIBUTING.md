# Contributing to Manga Haven

Welcome to the Manga Haven project! We are excited to have you contribute to our modern manga reading platform. Please follow the guidelines below to ensure a smooth and efficient collaboration.

## About Manga Haven

**Manga Haven** is a modern manga reading platform that blends stunning visuals with seamless performance. Our tech stack includes:

- **Frontend**: Next.js, React, and TypeScript
- **Backend**: PostgreSQL, Prisma, Docker

# Notion

Roadmap and Daily Task Will be Here

## [Notion](https://vine-hardware-4a9.notion.site/Manga-Haven-f617b774adc749d2b4a20b2c57b2a4b9)

## Fork The Repository

## Getting Started : Run the development server:

### Start Using Nextjs Server:

```bash
npm run dev
```

## OR

### Use Docker To Start Server :

#### Note - Currently Bind Mount is Not Working :

```bash
# Build Your Image :
docker build -f Dockerfile.dev -t mangahavendev .
```

### Run Your Image / Container:

```bash
# Command One :
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules mangahavendev
```

```bash
# Command Two :
docker run -p 3000:3000 -v ./app:/nextapp/app mangahavendev
```

### Use Docker Image From Official Docker Hub Registry :

```bash
# Pull Form Docker Hub :
docker pull downloadmaster/mangahaven:v.0.0.1
```

### Use Docker Compose To Start Server :

```bash
docker-compose up
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the Vercel Platform.
That Why Our Site Is also Deployed On Vercel .
