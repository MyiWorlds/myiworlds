FROM node:10

COPY ./dist/apps/graphql-api /usr/src/app
COPY ./package*.json /usr/src/app/

WORKDIR /usr/src/app

RUN npm install --only=production

CMD npm run graphql-api:start
