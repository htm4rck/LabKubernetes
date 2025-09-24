# Comandos Útiles para el Proyecto

## 🐳 Docker

### Construcción de Imágenes
```bash
# Backend
docker build -t books-backend ./backend

# Frontend
docker build -t books-frontend ./front

# Ambos con docker-compose
docker-compose build
```

### Ejecución
```bash
# Con docker-compose (recomendado)
docker-compose up -d

# Contenedores individuales
docker run -p 3000:3000 books-backend
docker run -p 4200:80 books-frontend
```

### Limpieza
```bash
# Parar y eliminar contenedores
docker-compose down

# Eliminar imágenes
docker rmi books-backend books-frontend

# Limpiar volúmenes
docker-compose down -v
```

## ☸️ Kubernetes

### Despliegue Completo
```bash
# Usar script automatizado (Windows)
deploy.bat

# Usar script automatizado (Linux/Mac)
./deploy.sh

# Manual
kubectl apply -f k8s/
```

### Verificación
```bash
# Ver todos los recursos
kubectl get all -n books-app

# Ver pods
kubectl get pods -n books-app

# Ver servicios
kubectl get services -n books-app

# Ver logs
kubectl logs -f deployment/backend-deployment -n books-app
kubectl logs -f deployment/frontend-deployment -n books-app
```

### Acceso a la Aplicación
```bash
# Frontend (NodePort)
# Acceder a http://localhost:30080

# Backend (Port Forward)
kubectl port-forward service/backend-service 3000:3000 -n books-app

# Acceso directo a pods
kubectl port-forward pod/<pod-name> 3000:3000 -n books-app
```

### Escalado
```bash
# Escalar backend
kubectl scale deployment backend-deployment --replicas=3 -n books-app

# Escalar frontend
kubectl scale deployment frontend-deployment --replicas=3 -n books-app
```

### Debugging
```bash
# Describir recursos
kubectl describe pod <pod-name> -n books-app
kubectl describe service backend-service -n books-app

# Ejecutar comandos en pods
kubectl exec -it <pod-name> -n books-app -- /bin/sh

# Ver eventos
kubectl get events -n books-app --sort-by='.lastTimestamp'
```

### Limpieza
```bash
# Eliminar toda la aplicación
kubectl delete namespace books-app

# Eliminar recursos específicos
kubectl delete -f k8s/
```

## 🔧 Desarrollo Local

### Backend (NestJS)
```bash
cd backend
npm install
npm run start:dev        # Modo desarrollo
npm run start:prod       # Modo producción
npm run test             # Tests unitarios
npm run test:e2e         # Tests e2e
```

### Frontend (Angular)
```bash
cd front
npm install
ng serve                 # Servidor desarrollo
ng build                 # Build producción
ng test                  # Tests unitarios
ng e2e                   # Tests e2e
ng generate component <name>  # Generar componente
```

## 📊 Monitoreo

### Logs en Tiempo Real
```bash
# Backend
kubectl logs -f deployment/backend-deployment -n books-app

# Frontend
kubectl logs -f deployment/frontend-deployment -n books-app

# Todos los pods
kubectl logs -f -l app=backend -n books-app
```

### Métricas de Recursos
```bash
# Uso de recursos por pods
kubectl top pods -n books-app

# Uso de recursos por nodos
kubectl top nodes
```

## 🚀 CI/CD

### Build y Push de Imágenes
```bash
# Tag para registry
docker tag books-backend:latest <registry>/books-backend:v1.0.0
docker tag books-frontend:latest <registry>/books-frontend:v1.0.0

# Push a registry
docker push <registry>/books-backend:v1.0.0
docker push <registry>/books-frontend:v1.0.0
```

### Actualización de Deployments
```bash
# Actualizar imagen
kubectl set image deployment/backend-deployment backend=<registry>/books-backend:v1.0.1 -n books-app

# Rollback
kubectl rollout undo deployment/backend-deployment -n books-app

# Ver historial
kubectl rollout history deployment/backend-deployment -n books-app
```

## 🔍 Troubleshooting

### Problemas Comunes
```bash
# Pod no inicia
kubectl describe pod <pod-name> -n books-app
kubectl logs <pod-name> -n books-app

# Servicio no accesible
kubectl get endpoints -n books-app
kubectl describe service <service-name> -n books-app

# Problemas de red
kubectl exec -it <pod-name> -n books-app -- nslookup backend-service
kubectl exec -it <pod-name> -n books-app -- curl backend-service:3000/health
```