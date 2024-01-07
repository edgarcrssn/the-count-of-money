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
RUN npx nx run ui:build:production

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/apps/ui /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
