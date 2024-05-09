FROM node:latest

ENV JWT_SECRET=value

ENV JWT_REFRESH_SECRET=value

RUN npm install -g nodemon

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
