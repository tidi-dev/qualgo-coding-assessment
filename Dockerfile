FROM node:20-alpine

WORKDIR /usr/src/app/

COPY package.json yarn.lock ./

COPY libs/database/schema.prisma libs/database/schema.prisma

RUN yarn install

COPY . .

RUN yarn prisma generate


USER node

EXPOSE 3000

CMD ["yarn", "start"]
