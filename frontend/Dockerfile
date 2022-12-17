# 1st stage
# building react app for production
FROM node:18 as builder
COPY . /app
WORKDIR /app
RUN yarn install && yarn build

# 2nd stage
# serving react app using NGINX
FROM nginx:latest
WORKDIR /
RUN rm -r /usr/share/nginx/html
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
# starting the container
ENTRYPOINT ["nginx", "-g", "daemon off;"]