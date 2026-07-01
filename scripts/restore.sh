#!/bin/bash

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

# Find the latest .sql backup file in backups directory
BACKUP_FILE=""
if [ -n "$1" ]; then
  if [ -f "$1" ]; then
    BACKUP_FILE="$1"
  else
    echo "❌ Error: Specified backup file not found at: $1"
    exit 1
  fi
else
  BACKUP_FILE=$(ls -t backups/*.sql 2>/dev/null | head -n 1)
fi

if [ -z "$BACKUP_FILE" ]; then
  echo "❌ Error: No SQL backup files found in backups/ directory."
  exit 1
fi

# Mask database password in URL for display
MASKED_URL=$(echo "$DATABASE_URL" | sed -E 's/(postgresql:\/\/.*?):.*?@/\1:********@/')

echo -e "\nSelected Backup File: ${BACKUP_FILE}"
echo "Destination Database: ${MASKED_URL}"

# Read confirmation from user (force flag -y or --yes skips this)
CONFIRM=""
if [[ "$*" == *"-y"* || "$*" == *"--yes"* ]]; then
  CONFIRM="yes"
else
  read -p $'\n⚠️  WARNING: Restoring will overwrite data in the destination database.\nAre you sure you want to proceed? (type \'yes\' to confirm): ' CONFIRM
fi

if [ "$CONFIRM" != "yes" ]; then
  echo "Restore operation cancelled."
  exit 0
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  echo "❌ Error: Docker is not installed or not in system PATH."
  exit 1
fi

# Translate localhost/127.0.0.1 to host.docker.internal for Docker environment
DATABASE_URL_FOR_DOCKER=$(echo "$DATABASE_URL" | sed 's/127.0.0.1/host.docker.internal/g' | sed 's/localhost/host.docker.internal/g')

# Run psql inside Docker container
echo "Running psql restore inside Docker container..."
if docker run -i --rm --add-host=host.docker.internal:host-gateway postgres:16-alpine psql "$DATABASE_URL_FOR_DOCKER" < "$BACKUP_FILE"; then
  echo "✨ Database restore completed successfully via Docker!"
  exit 0
else
  echo "❌ Error: Docker psql restore failed."
  exit 1
fi
