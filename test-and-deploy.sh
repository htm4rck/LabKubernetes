#!/bin/bash

echo "🧪 Ejecutando pruebas automatizadas antes del despliegue..."

# Construir y ejecutar pruebas
docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit

# Verificar si las pruebas pasaron
if [ $? -eq 0 ]; then
    echo "✅ Todas las pruebas pasaron. Procediendo con el despliegue..."
    
    # Ejecutar despliegue normal
    ./deploy.sh
else
    echo "❌ Las pruebas fallaron. Despliegue cancelado."
    exit 1
fi

# Limpiar contenedores de prueba
docker-compose -f docker-compose.test.yml down -v