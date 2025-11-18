FROM node:20-bullseye-slim

WORKDIR /app

RUN npm install -g pnpm@latest

COPY package.json pnpm-lock.yaml* ./

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm prisma generate

RUN pnpm build

ENV NODE_ENV=production

ENV PORT=3000

EXPOSE 3000

CMD ["pnpm", "start"]
