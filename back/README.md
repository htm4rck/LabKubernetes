# Backend - LabKubernetes API

API REST desarrollada con NestJS para la gestión de libros y categorías.

## 🚀 Características

- **NestJS**: Framework Node.js escalable
- **TypeORM**: ORM para TypeScript
- **SQLite**: Base de datos ligera
- **Swagger**: Documentación automática de API
- **Validación**: Validación de datos con class-validator
- **CORS**: Configurado para frontend Angular

## 📊 Endpoints

### Categorías
- `GET /categorias` - Listar todas las categorías
- `POST /categorias` - Crear nueva categoría
- `GET /categorias/:id` - Obtener categoría por ID
- `PATCH /categorias/:id` - Actualizar categoría
- `DELETE /categorias/:id` - Eliminar categoría

### Libros
- `GET /libros` - Listar todos los libros
- `POST /libros` - Crear nuevo libro
- `GET /libros/:id` - Obtener libro por ID
- `GET /libros/categoria/:categoriaId` - Libros por categoría
- `PATCH /libros/:id` - Actualizar libro
- `DELETE /libros/:id` - Eliminar libro

### Utilidad
- `GET /` - Mensaje de bienvenida
- `GET /health` - Health check
- `GET /api` - Documentación Swagger

## 🛠️ Desarrollo

### Instalación
```bash
npm install
```

### Ejecutar en desarrollo
```bash
npm run start:dev
```

### Construir para producción
```bash
npm run build
npm run start:prod
```

### Tests
```bash
npm run test
npm run test:e2e
```

## 🐳 Docker

```bash
# Construir imagen
docker build -t books-backend .

# Ejecutar contenedor
docker run -p 3000:3000 books-backend
```

## 🔧 Variables de Entorno

```env
PORT=3000
DB_PATH=./database.sqlite
CORS_ORIGIN=http://localhost:4200
```

## 📁 Estructura

```
src/
├── categorias/          # Módulo de categorías
├── libros/             # Módulo de libros
├── entities/           # Entidades TypeORM
├── dto/               # Data Transfer Objects
├── database/          # Configuración y seed de BD
├── app.module.ts      # Módulo principal
└── main.ts           # Punto de entrada
```

## 🗄️ Base de Datos

La aplicación usa SQLite con datos iniciales que se cargan automáticamente:
- 4 categorías predefinidas
- 7 libros de ejemplo
- Relaciones entre libros y categorías

## 📚 Documentación

Una vez ejecutada la aplicación, la documentación Swagger está disponible en:
`http://localhost:3000/api`