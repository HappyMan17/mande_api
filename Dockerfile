FROM node:17

# Create app directory
WORKDIR /devhappy/mande_api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000
CMD [ "npm", "run", "dev" ]
