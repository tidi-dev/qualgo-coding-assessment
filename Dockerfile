FROM node:20-alpine

WORKDIR /usr/src/app/

COPY package.json yarn.lock ./

COPY src/database/schema.prisma src/database/schema.prisma

RUN yarn install

COPY . .

RUN yarn prisma generate


USER node

EXPOSE 3000

CMD ["yarn", "start"]
