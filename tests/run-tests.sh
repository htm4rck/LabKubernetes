#!/bin/bash

echo "🧪 Ejecutando pruebas de LabKubernetes..."

# Variables de entorno
export API_URL=${API_URL:-"http://localhost:3000"}
export FRONTEND_URL=${FRONTEND_URL:-"http://localhost:4200"}

# Verificar que k6 esté instalado
if ! command -v k6 &> /dev/null; then
    echo "❌ k6 no está instalado. Instálalo desde: https://k6.io/docs/getting-started/installation/"
    exit 1
fi

echo "🔧 Configuración:"
echo "  API URL: $API_URL"
echo "  Frontend URL: $FRONTEND_URL"

# Verificar que los servicios estén disponibles
echo "🔍 Verificando servicios..."
if ! curl -f "$API_URL/health" > /dev/null 2>&1; then
    echo "❌ Backend no está disponible en $API_URL"
    exit 1
fi

if ! curl -f "$FRONTEND_URL" > /dev/null 2>&1; then
    echo "❌ Frontend no está disponible en $FRONTEND_URL"
    exit 1
fi

echo "✅ Servicios disponibles"

# Ejecutar pruebas de carga con k6
echo "🚀 Ejecutando pruebas de carga..."
k6 run k6/load-test.js

echo "💪 Ejecutando pruebas de estrés..."
k6 run k6/stress-test.js

echo "⚡ Ejecutando pruebas de picos..."
k6 run k6/spike-test.js

# Ejecutar pruebas E2E con Playwright
echo "🎭 Ejecutando pruebas E2E..."
cd e2e
npx playwright test

echo "📊 Generando reporte..."
npx playwright show-report

echo "✅ Todas las pruebas completadas!"