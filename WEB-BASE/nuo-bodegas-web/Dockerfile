FROM node:latest as node

ARG ENV=prod
ARG APP=nuo-bodegas-web
ENV ENV ${ENV}
ENV APP ${APP}
WORKDIR /app
COPY ./ /app/

# Instala y construye el Angular App
RUN npm ci
RUN ng serve
RUN mv /app/dist/${APP}/* /app/dist/
EXPOSE 4200

# Angular app construida, la vamos a hostear un server production, este es Nginx
FROM nginx:1.13.8-alpine
COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf