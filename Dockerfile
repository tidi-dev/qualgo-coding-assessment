FROM node:20-alpine

WORKDIR /usr/src/app/

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn prisma generate

USER node

EXPOSE 3000

CMD ["yarn", "start"]
