FROM node:6.9.1
RUN npm install -g yarn

COPY package.json yarn.lock ./
RUN yarn --pure-lockfile

COPY src src
COPY public public

RUN yarn run build

FROM nginx
COPY --from=0 build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
