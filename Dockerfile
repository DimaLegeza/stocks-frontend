FROM nginx
COPY dist /usr/share/nginx/html
COPY default-nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
