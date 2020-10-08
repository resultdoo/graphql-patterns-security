FROM tarampampam/node:14-alpine

WORKDIR /usr/src/app

ADD package.json ./

RUN mkdir ./node_modules
RUN yarn install

RUN NODE_ENV=development

ADD src ./src
ADD tsconfig.json tsconfig.json
ADD .npmrc .npmrc

CMD yarn start:dev