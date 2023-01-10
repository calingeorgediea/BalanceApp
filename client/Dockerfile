FROM nginx:alpine

WORKDIR /etc/nginx

COPY ./dist/ /usr/share/nginx/html/
COPY ./nginx.conf ./conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
