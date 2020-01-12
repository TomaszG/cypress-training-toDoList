FROM node:lts-alpine
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci
CMD npm run start
