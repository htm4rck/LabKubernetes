@echo off
echo 🚀 Desplegando LabKubernetes en Kubernetes...

REM Construir imágenes Docker
echo 📦 Construyendo imágenes Docker...
docker build -t labkubernetes-backend:latest ./back
docker build -t labkubernetes-frontend:latest ./front

REM Aplicar manifiestos de Kubernetes
echo ☸️ Aplicando manifiestos de Kubernetes...
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/persistent-volume.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml

REM Esperar a que los pods estén listos
echo ⏳ Esperando a que los pods estén listos...
kubectl wait --for=condition=ready pod -l app=backend -n books-app --timeout=300s
kubectl wait --for=condition=ready pod -l app=frontend -n books-app --timeout=300s

REM Mostrar estado
echo 📊 Estado de la aplicación:
kubectl get pods -n books-app
kubectl get services -n books-app

echo ✅ Despliegue completado!
echo 🌐 Frontend disponible en: http://localhost:30080
echo 🔧 Para acceder al backend: kubectl port-forward service/backend-service 3000:3000 -n books-app
pause