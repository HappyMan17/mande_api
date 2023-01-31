FROM node:17

# Create app directory
WORKDIR /devHappy/db_proyect/mande_api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
