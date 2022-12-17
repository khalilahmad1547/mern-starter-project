FROM node:18
COPY . /app
WORKDIR /app
RUN yarn install
ENV PORT=8000
EXPOSE ${PORT}
CMD [ "node", "server.js" ]