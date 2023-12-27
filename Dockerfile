FROM node:21-alpine

WORKDIR /app

COPY . .

RUN npm install --force

EXPOSE 3000

CMD [ "npm", "start" ]
