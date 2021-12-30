FROM node:14-alpine

WORKDIR /app

RUN apk update

COPY ./package*.json ./

RUN npm install

COPY ./ .

ENV HOST 0.0.0.0
EXPOSE 3000