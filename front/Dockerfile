# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copiar archivos construidos
COPY --from=builder /app/dist/app-test/browser /usr/share/nginx/html

# Configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S angular -u 1001
RUN chown -R angular:nodejs /usr/share/nginx/html
RUN chown -R angular:nodejs /var/cache/nginx
RUN chown -R angular:nodejs /var/log/nginx
RUN chown -R angular:nodejs /etc/nginx/conf.d
RUN touch /var/run/nginx.pid
RUN chown -R angular:nodejs /var/run/nginx.pid

USER angular

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]