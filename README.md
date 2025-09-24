# Proyecto Kubernetes - Backend NestJS + Frontend Angular

Este proyecto implementa una aplicación completa de gestión de libros y categorías usando NestJS como backend y Angular como frontend, con SQLite como base de datos. El objetivo principal es demostrar la containerización con Docker y el despliegue en Kubernetes.

## 🏗️ Arquitectura del Proyecto

```
kubernetes-github/
├── back/            # API NestJS
├── front/           # Aplicación Angular
├── k8s/             # Manifiestos de Kubernetes
├── tests/           # Pruebas de carga (k6) y E2E (Playwright)
├── docker-compose.yml
├── deploy.sh/.bat   # Scripts de despliegue
└── README.md
```

## 📋 Funcionalidades

### Backend (NestJS)
- API REST para gestión de libros y categorías
- Base de datos SQLite integrada
- Validación de datos con class-validator
- Documentación automática con Swagger
- CORS habilitado para el frontend

### Frontend (Angular)
- Interfaz para gestionar libros y categorías
- Formularios reactivos
- Comunicación con API REST
- Diseño responsive

### Modelos de Datos

**Categoría**
- id: number (auto-increment)
- nombre: string
- descripcion: string

**Libro**
- id: number (auto-increment)
- titulo: string
- autor: string
- isbn: string
- categoriaId: number (FK)

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+
- Docker
- Docker Compose
- kubectl (para Kubernetes)

### 1. Desarrollo Local

#### Backend
```bash
cd back
npm install
npm run start:dev
# API disponible en http://localhost:3000
# Swagger en http://localhost:3000/api
```

#### Frontend
```bash
cd front
npm install
ng serve
# App disponible en http://localhost:4200
```

### 2. Con Docker Compose

```bash
# Construir y ejecutar todos los servicios
docker-compose up --build

# Servicios disponibles:
# - Backend: http://localhost:3000
# - Frontend: http://localhost:4200
```

### 3. Pruebas Automatizadas + Despliegue

```bash
# Ejecutar pruebas y desplegar si pasan
./test-and-deploy.sh  # Linux/Mac
test-and-deploy.bat   # Windows

# Solo pruebas
docker-compose -f docker-compose.test.yml up --build
```

### 4. Despliegue en Kubernetes

```bash
# Aplicar todos los manifiestos
kubectl apply -f k8s/

# Verificar el estado
kubectl get pods
kubectl get services

# Acceder a la aplicación
kubectl port-forward service/frontend-service 4200:80
kubectl port-forward service/backend-service 3000:3000
```

## 🐳 Docker

### Imágenes Docker

El proyecto incluye Dockerfiles optimizados para producción:

- **Backend**: Imagen multi-stage con Node.js Alpine
- **Frontend**: Imagen multi-stage con Nginx para servir archivos estáticos

### Comandos Docker Útiles

```bash
# Construir imágenes individualmente
docker build -t books-backend ./back
docker build -t books-frontend ./front

# Ejecutar contenedores individuales
docker run -p 3000:3000 books-backend
docker run -p 4200:80 books-frontend
```

## ☸️ Kubernetes

### Componentes Desplegados

1. **Backend Deployment**: 2 réplicas del API NestJS
2. **Frontend Deployment**: 2 réplicas del servidor Nginx
3. **Services**: Exposición de servicios backend y frontend
4. **ConfigMaps**: Configuración de la aplicación
5. **PersistentVolume**: Almacenamiento para SQLite

### Manifiestos Incluidos

- `backend-deployment.yaml`: Despliegue del backend
- `frontend-deployment.yaml`: Despliegue del frontend
- `backend-service.yaml`: Servicio del backend
- `frontend-service.yaml`: Servicio del frontend
- `configmap.yaml`: Configuraciones
- `persistent-volume.yaml`: Volumen persistente para la BD

## 🔧 Configuración

### Variables de Entorno

#### Backend
```env
PORT=3000
DB_PATH=./database.sqlite
CORS_ORIGIN=http://localhost:4200
```

#### Frontend
```env
API_URL=http://localhost:3000
```

## 📊 API Endpoints

### Categorías
- `GET /categorias` - Listar todas las categorías
- `POST /categorias` - Crear nueva categoría
- `GET /categorias/:id` - Obtener categoría por ID
- `PUT /categorias/:id` - Actualizar categoría
- `DELETE /categorias/:id` - Eliminar categoría

### Libros
- `GET /libros` - Listar todos los libros
- `POST /libros` - Crear nuevo libro
- `GET /libros/:id` - Obtener libro por ID
- `PUT /libros/:id` - Actualizar libro
- `DELETE /libros/:id` - Eliminar libro
- `GET /libros/categoria/:categoriaId` - Libros por categoría

## 🧪 Testing

### Pruebas de Carga (k6)
```bash
cd tests

# Instalar k6 y dependencias
npm install

# Ejecutar todas las pruebas
./run-tests.sh  # Linux/Mac
run-tests.bat   # Windows

# Pruebas individuales
npm run k6:load    # Prueba de carga
npm run k6:stress  # Prueba de estrés
npm run k6:spike   # Prueba de picos
```

### Pruebas E2E (Playwright)
```bash
cd tests
npm run e2e:install  # Instalar browsers
npm run e2e:test     # Ejecutar pruebas
npm run e2e:ui       # Modo interactivo
npm run e2e:report   # Ver reportes
```

### Pruebas Unitarias
```bash
# Backend
cd back
npm run test
npm run test:e2e

# Frontend
cd front
ng test
ng e2e
```

## 📝 Notas de Desarrollo

- SQLite se usa para simplicidad; en producción considerar PostgreSQL
- Los volúmenes persistentes en Kubernetes mantienen los datos de la BD
- El frontend está configurado para hacer proxy al backend en desarrollo
- CORS está habilitado para permitir comunicación entre servicios

## 🚀 Próximos Pasos

1. Implementar autenticación JWT
2. Agregar logging centralizado
3. Configurar CI/CD pipeline
4. Implementar monitoring con Prometheus
5. Agregar tests de integración
6. Migrar a base de datos PostgreSQL

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.