FROM node:carbon-alpine
WORKDIR /code

RUN apk update && apk upgrade

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY . .

RUN npm run build

ENTRYPOINT npm run start:prod