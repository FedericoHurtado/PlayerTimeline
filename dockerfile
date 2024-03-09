# base image
FROM node:18-alpine

# create app directory
WORKDIR /app

# install necessary dependencies into directory
copy package.json ./
RUN npm install

# bundle app source
COPY . . 

EXPOSE 8080

CMD ["npm", "start"]