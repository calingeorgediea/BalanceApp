FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

# Copy the rest of the application source code
COPY . .

RUN npm run build

# Serve the app using an nginx image
FROM nginx:1.19
COPY --from=0 /usr/src/app/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
