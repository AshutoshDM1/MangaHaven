# Manga Haven

### A Modern Manga Reading platform that blends stunning visuals with seamless Performance.

## Tech Stack

### Next.js , React and TypeScript.

### PostgreSQL , Prisma , Docker.
![map](https://github.com/AshutoshDM1/MangaHaven/blob/main/github%20assests/Manga%20Haven%20Map.png)

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

###  Run Your Image / Container:

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
