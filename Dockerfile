FROM node:14

COPY app/ /app

WORKDIR /app

RUN npm install
RUN npm install ionic
RUN npx ionic build --prod