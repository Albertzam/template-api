FROM node:14-alpine

COPY ./package.json package.json
COPY ./dist dist
RUN yarn install --production
ENV NODE_ENV production

CMD node dist/main