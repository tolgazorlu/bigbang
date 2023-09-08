#  Dockerfile for Node Express Backend

FROM node

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 8000

CMD ["npm","run", "dev"]