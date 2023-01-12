# FROM nginx:alpine

# WORKDIR /etc/nginx

# COPY ./dist/client /usr/share/nginx/html/
# COPY ./nginx.conf ./conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]


FROM node:14 as build-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g @angular/cli
RUN ng build --prod

FROM nginx:alpine

WORKDIR /etc/nginx

COPY --from=build-stage /usr/src/app/dist/client /usr/share/nginx/html/
COPY ./nginx.conf ./conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
