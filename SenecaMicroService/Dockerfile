FROM mhart/alpine-node-auto

RUN mkdir -p /app/SenecaMicroService
WORKDIR /app/SenecaMicroService

COPY package.json .
RUN npm install --production

COPY . .

CMD ["node", "user-microservice.js"]