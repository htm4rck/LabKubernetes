# Dockerfile para ejecutar pruebas automatizadas
FROM node:18-alpine

# Instalar k6
RUN apk add --no-cache curl && \
    curl -s https://github.com/grafana/k6/releases/download/v0.47.0/k6-v0.47.0-linux-amd64.tar.gz | tar -xz -C /tmp && \
    mv /tmp/k6-v0.47.0-linux-amd64/k6 /usr/local/bin/

# Instalar Playwright dependencies
RUN apk add --no-cache \
    chromium \
    firefox \
    webkit2gtk \
    glib \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set Playwright to use system browsers
ENV PLAYWRIGHT_BROWSERS_PATH=/usr/bin
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

WORKDIR /tests

# Copiar archivos de pruebas
COPY package*.json ./
COPY k6/ ./k6/
COPY e2e/ ./e2e/
COPY run-tests.sh ./

# Instalar dependencias
RUN npm install

# Hacer ejecutable el script
RUN chmod +x run-tests.sh

# Variables de entorno por defecto
ENV API_URL=http://backend:3000
ENV FRONTEND_URL=http://frontend

# Comando por defecto
CMD ["./run-tests.sh"]