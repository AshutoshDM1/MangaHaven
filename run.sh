#!/bin/bash

echo "🚀 Building MangaHaven Docker Image..."
echo "📊 Build started at: $(date)"

docker build \
  --build-arg NEXT_PUBLIC_GOOGLE_CLIENT_ID="592349349382-1muihcff63cjgvkicg8dnl6i9edu4m46.apps.googleusercontent.com" \
  --build-arg NEXT_PUBLIC_GITHUB_CLIENT_ID="Ov23lixeX9gmboXS5fuM" \
  --build-arg NEXT_PUBLIC_API_URL="http://localhost:3000" \
  --build-arg NEXT_PUBLIC_SITE_URL="http://localhost:3000" \
  --build-arg DATABASE_URL="postgresql://MangaHaven_owner:npg_yIbDEzkR1ps9@ep-steep-sea-a1ax5is3-pooler.ap-southeast-1.aws.neon.tech/MangaHaven?sslmode=require&channel_binding=require" \
  -t mangaheaven-test:latest \
  .

if [ $? -eq 0 ]; then
  echo "✅ Build completed successfully at: $(date)"
  echo "📦 Image: mangaheaven-test:latest"
  echo ""
  echo "To run the container:"
  echo "  docker run -d -p 3000:3000 --env-file .env --name mangaheaven-test mangaheaven-test:latest"
  echo ""
  echo "To view logs:"
  echo "  docker logs -f mangaheaven-test"
else
  echo "❌ Build failed at: $(date)"
  exit 1
fi