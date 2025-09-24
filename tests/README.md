# Pruebas de LabKubernetes

Este directorio contiene todas las pruebas para la aplicación de libros y categorías.

## 🧪 Tipos de Pruebas

### 1. Pruebas de Carga con k6 (Backend)
- **Load Test**: Prueba de carga normal con usuarios concurrentes
- **Stress Test**: Prueba de estrés incrementando usuarios gradualmente
- **Spike Test**: Prueba de picos de tráfico súbito

### 2. Pruebas E2E con Playwright (Frontend)
- **Categorías**: CRUD completo de categorías
- **Libros**: Gestión de libros, filtros y búsquedas
- **Navegación**: Flujos de usuario completos

## 🚀 Instalación

### Prerrequisitos
```bash
# Instalar k6
# Windows (con Chocolatey)
choco install k6

# macOS (con Homebrew)
brew install k6

# Linux
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

### Instalar dependencias
```bash
cd tests
npm install
npm run e2e:install
```

## 🏃‍♂️ Ejecutar Pruebas

### Todas las pruebas
```bash
# Windows
run-tests.bat

# Linux/Mac
./run-tests.sh
```

### Pruebas individuales

#### k6 (Backend)
```bash
# Prueba de carga
npm run k6:load

# Prueba de estrés
npm run k6:stress

# Prueba de picos
npm run k6:spike

# Todas las pruebas k6
npm run k6:all
```

#### Playwright (Frontend)
```bash
# Ejecutar pruebas E2E
npm run e2e:test

# Modo interactivo
npm run e2e:ui

# Ver reporte
npm run e2e:report
```

## ⚙️ Configuración

### Variables de Entorno
```bash
# URLs de los servicios
export API_URL=http://localhost:3000
export FRONTEND_URL=http://localhost:4200

# Para Kubernetes
export API_URL=http://localhost:3000  # Con port-forward
export FRONTEND_URL=http://localhost:30080  # NodePort
```

### Configuración de k6
Las pruebas de k6 incluyen:
- Métricas personalizadas
- Thresholds para criterios de éxito/fallo
- Diferentes patrones de carga
- Validaciones de respuesta

### Configuración de Playwright
- Soporte multi-browser (Chrome, Firefox, Safari)
- Screenshots en fallos
- Trazas para debugging
- Reportes HTML

## 📊 Métricas y Reportes

### k6 Métricas
- `http_req_duration`: Tiempo de respuesta
- `http_req_failed`: Tasa de error
- `http_reqs`: Requests por segundo
- `vus`: Usuarios virtuales activos

### Playwright Reportes
- Reporte HTML interactivo
- Screenshots de fallos
- Videos de ejecución
- Trazas detalladas

## 🎯 Criterios de Éxito

### Backend (k6)
- 95% de requests < 500ms (load test)
- 95% de requests < 1s (stress test)
- Tasa de error < 10%
- Disponibilidad > 99%

### Frontend (Playwright)
- Todas las funcionalidades CRUD funcionan
- Navegación fluida entre secciones
- Formularios validan correctamente
- Filtros y búsquedas operativos

## 🐛 Debugging

### k6
```bash
# Ejecutar con más detalle
k6 run --verbose k6/load-test.js

# Con métricas personalizadas
k6 run --out json=results.json k6/load-test.js
```

### Playwright
```bash
# Modo debug
npx playwright test --debug

# Con browser visible
npx playwright test --headed

# Un test específico
npx playwright test specs/categorias.spec.js
```

## 📝 Notas

- Las pruebas asumen que la aplicación está ejecutándose
- Para Kubernetes, usar port-forward para acceder a los servicios
- Los datos de prueba se crean y limpian automáticamente
- Las pruebas E2E requieren que el frontend tenga data-testid attributes