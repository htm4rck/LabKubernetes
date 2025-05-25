FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.25-alpine
COPY --from=build /app/dist/app-test/browser/* /usr/share/nginx/html/.
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
