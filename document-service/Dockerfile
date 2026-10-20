FROM node:22-alpine

RUN apk add --no-cache libreoffice-writer libreoffice-calc font-liberation

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

ENV NODE_ENV=production

EXPOSE 10101

CMD ["npm", "run", "start:prod"]
