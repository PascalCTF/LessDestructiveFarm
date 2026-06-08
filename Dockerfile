FROM node:24

WORKDIR /usr/src/app

ADD ./package.json .
ADD ./package-lock.json .

RUN npm ci --include=dev

RUN npx next telemetry disable

ADD . .
RUN npm run build

ENV NODE_ENV production
RUN npm prune --production

EXPOSE 3000

CMD [ "npm", "start" ]
