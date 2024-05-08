FROM node:latest

ENV mongo_password=value
ENV mongo_username=value
ENV mongo_cluster=value
ENV mongo_database=value

RUN npm install -g nodemon

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
