FROM node:14-alpine
WORKDIR /usr/src/app/FoodApp
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
