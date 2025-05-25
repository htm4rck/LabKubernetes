FROM node:22-alpine3.21
RUN apk add --no-cache make gcc g++ python3
WORKDIR /usr/src/app
COPY . .
RUN npm ci
EXPOSE 3000
CMD ["npm", "run", "start"]