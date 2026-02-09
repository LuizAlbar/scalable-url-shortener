FROM nginx:alpine

# RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY /sites-enabled/load-balancer.conf /etc/nginx/sites-enabled/load-balancer.conf

COPY cert/cert.pem /etc/nginx/ssl/cert.pem
COPY cert/key.pem /etc/nginx/ssl/key.pem

EXPOSE 80
# EXPOSE 443