FROM node:alpine AS build

RUN apk update && apk upgrade

WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

RUN npm run build

FROM nginx

COPY --from=build /usr/src/app/dist/front /usr/share/nginx/html
