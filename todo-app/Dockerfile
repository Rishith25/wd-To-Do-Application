FROM --platform=$BUILDPLATFORM node:lts-alpine as base
WORKDIR /app
COPY todo-app/package.json /app/
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm install -g husky && pm2 -g
COPY . /app
CMD pm2 start index.js -i max --log ./logs/app.log

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /app
CMD npm run start

