#!/bin/bash

# Create backups directory if it doesn't exist
mkdir -p backups

# Load environment variables from .env
if [ -f .env ]; then
  echo "Loading environment variables from .env..."
  while IFS= read -r line || [ -n "$line" ]; do
    # Skip comments, empty lines, or lines without '='
    [[ "$line" =~ ^#.*$ ]] && continue
    [[ "$line" =~ ^[[:space:]]*$ ]] && continue
    [[ "$line" != *"="* ]] && continue
    
    key=$(echo "$line" | cut -d'=' -f1 | xargs)
    val=$(echo "$line" | cut -d'=' -f2- | xargs)
    
    # Strip surrounding quotes
    val="${val%\"}"
    val="${val#\"}"
    val="${val%\'}"
    val="${val#\'}"
    
    export "$key=$val"
  done < .env
else
  echo "⚠️  .env file not found."
fi

# Ensure DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ Error: DATABASE_URL environment variable is not defined in .env"
  exit 1
fi

TIMESTAMP=$(date +"%Y-%m-%dT%H-%M-%S")
BACKUP_PATH="backups/backup_${TIMESTAMP}.sql"

echo "Attempting database backup to ${BACKUP_PATH} using Docker..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  echo "❌ Error: Docker is not installed or not in system PATH."
  exit 1
fi

# Translate localhost/127.0.0.1 to host.docker.internal for Docker environment
DATABASE_URL_FOR_DOCKER=$(echo "$DATABASE_URL" | sed 's/127.0.0.1/host.docker.internal/g' | sed 's/localhost/host.docker.internal/g')

# Run pg_dump in Docker
if docker run --rm --add-host=host.docker.internal:host-gateway postgres:16-alpine pg_dump "$DATABASE_URL_FOR_DOCKER" > "$BACKUP_PATH"; then
  # Check if backup file is empty
  if [ -s "$BACKUP_PATH" ]; then
    echo "✨ Database backup completed successfully via Docker (SQL format)!"
    exit 0
  else
    echo "❌ Error: Docker pg_dump generated an empty file."
    rm -f "$BACKUP_PATH"
    exit 1
  fi
else
  echo "❌ Error: Docker pg_dump execution failed."
  rm -f "$BACKUP_PATH"
  exit 1
fi
