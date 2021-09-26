FROM node:16-alpine3.11
USER root
RUN apk add --update --quiet python make g++
USER node
WORKDIR /home/node
COPY package.json .
RUN npm install --quiet
COPY . .