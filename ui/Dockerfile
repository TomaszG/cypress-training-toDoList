FROM node:lts-alpine as builder
RUN apk --no-cache --virtual build-dependencies add \
  python2 \
  make \
  g++
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci \
  && apk del build-dependencies

FROM node:lts-alpine
WORKDIR /app
COPY --from=builder /app /app
CMD npm run start
