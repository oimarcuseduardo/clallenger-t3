FROM node:20 AS builder

USER root

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:20-alpine

WORKDIR /app

RUN apk --no-cache add curl

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env ./

RUN yarn install --production

EXPOSE 3000

CMD ["yarn", "start"]