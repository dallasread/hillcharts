FROM node:16-alpine

# deps to actually render the fonts
RUN apk add --no-cache font-terminus font-inconsolata font-dejavu font-noto font-noto-cjk font-awesome font-noto-extra

# deps for building node-canvas
RUN apk add --no-cache make gcc g++ python3 pkgconfig pixman-dev cairo-dev pango-dev libjpeg-turbo-dev

WORKDIR /home/node/app

RUN set -eux \
    & apk add \
    --no-cache \
    nodejs \
    yarn \
    python3 \
    py3-pip \
    cairo \
    pango \
    libjpeg-turbo

COPY . .

RUN yarn install

EXPOSE 3000

CMD [ "yarn", "start" ]