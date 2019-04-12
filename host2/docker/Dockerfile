FROM node:8

RUN mkdir /src
WORKDIR /src

COPY ./package.json /src/package.json
COPY ./package-lock.json /src/package-lock.json

RUN npm install amqplib
RUN npm install

CMD ["node", "server/index.js"]