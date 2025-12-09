FROM node:20-bullseye-slim

WORKDIR /app

RUN npm install -g pnpm@latest

COPY package.json pnpm-lock.yaml* ./

COPY . .

RUN pnpm install --frozen-lockfile

# Accept build arguments for all required variables
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG NEXT_PUBLIC_GITHUB_CLIENT_ID
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_URL
ARG DATABASE_URL

# Make NEXT_PUBLIC_* variables available during build (these get baked into the bundle)
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_PUBLIC_GITHUB_CLIENT_ID=$NEXT_PUBLIC_GITHUB_CLIENT_ID
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# DATABASE_URL needed for prisma generate
ENV DATABASE_URL=$DATABASE_URL

# Debug: Print environment variables (will show in build logs)
RUN echo "Building with NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL"
RUN echo "Building with NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL"

RUN pnpm prisma generate

RUN pnpm build

ENV NODE_ENV=production

ENV PORT=3000

EXPOSE 3000

CMD ["pnpm", "start"]
