# Manga Haven

### A Modern Manga reading platform that blends stunning visuals with seamless Performance.

## Tech Stack 

### Next.js , React and TypeScript.
### PostgreSQL , Prisma , Docker.

## Getting Started

First, run the development server:

### Start Using Nextjs Server:

```bash
npm run dev
# or
npm run build
```
### Use Docker To Start Server :

```bash
# Build Your Image :

docker build -f Dockerfile.dev -t mangahavendev .

#  Run Your Image / Container:
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules mangahavendev

```

### Use Docker Compose To Start Server :

```bash
docker-compose up -d
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the Vercel Platform.
That Why Our Site Is also Deployed On Vercel .
