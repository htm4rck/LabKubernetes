@echo off
echo 🧪 Ejecutando pruebas de LabKubernetes...

REM Variables de entorno
if "%API_URL%"=="" set API_URL=http://localhost:3000
if "%FRONTEND_URL%"=="" set FRONTEND_URL=http://localhost:4200

echo 🔧 Configuración:
echo   API URL: %API_URL%
echo   Frontend URL: %FRONTEND_URL%

REM Verificar que k6 esté instalado
k6 version >nul 2>&1
if errorlevel 1 (
    echo ❌ k6 no está instalado. Instálalo desde: https://k6.io/docs/getting-started/installation/
    pause
    exit /b 1
)

echo ✅ k6 disponible

REM Ejecutar pruebas de carga con k6
echo 🚀 Ejecutando pruebas de carga...
k6 run k6/load-test.js

echo 💪 Ejecutando pruebas de estrés...
k6 run k6/stress-test.js

echo ⚡ Ejecutando pruebas de picos...
k6 run k6/spike-test.js

REM Ejecutar pruebas E2E con Playwright
echo 🎭 Ejecutando pruebas E2E...
cd e2e
npx playwright test

echo 📊 Generando reporte...
npx playwright show-report

echo ✅ Todas las pruebas completadas!
pause