FROM node:17

# Create app directory
WORKDIR /devHappy/db_proyect/mande_api

EXPOSE 8080
CMD [ "npm", "start" ]
