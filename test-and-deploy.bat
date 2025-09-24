@echo off
echo 🧪 LabKubernetes - Ejecutando pruebas automatizadas antes del despliegue...

REM Construir y ejecutar pruebas
docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit

REM Verificar si las pruebas pasaron
if %errorlevel% equ 0 (
    echo ✅ Todas las pruebas pasaron. Procediendo con el despliegue...
    
    REM Ejecutar despliegue normal
    call deploy.bat
) else (
    echo ❌ Las pruebas fallaron. Despliegue cancelado.
    exit /b 1
)

REM Limpiar contenedores de prueba
docker-compose -f docker-compose.test.yml down -v

pause