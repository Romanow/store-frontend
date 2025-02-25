FROM nginx:1.25
COPY config/default.conf /etc/nginx/default.conf
COPY ./dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
