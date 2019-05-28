FROM node:8

RUN mkdir /app
WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm install -g nodemon && npm i

CMD ["nodemon", "server/index.js"]