FROM node:14-alpine 
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:14-alpine
COPY --from=0 /app/dist/client /app
COPY --from=0 /app/package*.json /app
RUN npm install 
CMD [ "npm", "start" ]
