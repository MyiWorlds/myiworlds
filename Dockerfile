FROM node:10

WORKDIR /usr/src/app

ENV PORT 8000
ENV HOST 0.0.0.0

COPY package*.json ./

RUN npm install --only=production

COPY /dist/apps/graphql-api .

CMD npm run graphql-api:start

# After running test locally with
# docker run -p 8000:8000 BUILDID

# Tag docker container with latest
# docker tag 2759fcf1fd3c gcr.io/myiworlds/graphql-api:latest

# Push to Google Cloud Source Repo
# docker push gcr.io/myiworlds/graphql-api:latest

# Re deploy inside cloud run
