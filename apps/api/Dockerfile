FROM node:20 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx nx run types:build
RUN npx nx run regex:build

WORKDIR /app/apps/api
RUN npx prisma generate

WORKDIR /app
RUN npx nx run api:build:production

FROM node:20

WORKDIR /app

COPY --from=builder /app/dist/apps/api .
COPY --from=builder /app/apps/api/prisma ./prisma

RUN npm install
RUN npx prisma generate

CMD [ "node", "main.js" ]
