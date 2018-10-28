FROM node:8.9-alpine as base
WORKDIR /usr/src/app
# Copy all the application files to the desired location
COPY . /usr/src/app
RUN npm install --silent

FROM keymetrics/pm2:latest-alpine

RUN apk -U upgrade && apk add curl && rm -rf /var/cache/apk/*
# RUN npm install -g pm2
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/ .
VOLUME /usr/src/app/data

EXPOSE 4002 4003
CMD ["npm", "run", "start:logs"]