FROM node:10

WORKDIR /graphql-api

COPY package*.json /graphql-api/

RUN npm install

COPY . /graphql-api/

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
