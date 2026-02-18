FROM node:20-alpine as deps

WORKDIR /app

COPY package*.json ./
RUN npm ci

FROM node:20-alpine as dev

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY . .

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]