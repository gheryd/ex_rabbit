FROM node:8

RUN mkdir /src
WORKDIR /src

COPY ./package.json /src/package.json
COPY ./package-lock.json /src/package-lock.json

RUN npm install -g nodemon && \
    npm install -g json-server && \
    npm i

CMD ["nodemon", "server/index.js"]