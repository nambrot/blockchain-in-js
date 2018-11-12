FROM node:6
RUN npm install -g yarn
RUN yarn add express
RUN yarn add socket.io

# COPY package.json yarn.lock ./
# RUN yarn --pure-lockfile

COPY ./src ./src
CMD node src/server.js
