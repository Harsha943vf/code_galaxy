@echo off
REM CodeGalaxy Development Server Starter (Windows)

echo.
echo ================================
echo ^>^> Starting CodeGalaxy Servers
echo ================================
echo.

REM Check if node_modules exist for server
if not exist "server\node_modules" (
    echo ^> Installing server dependencies...
    cd server
    call npm install
    cd ..
)

REM Check if node_modules exist for client
if not exist "client\node_modules" (
    echo ^> Installing client dependencies...
    cd client
    call npm install
    cd ..
)

echo.
echo ^>^> Starting Backend Server on Port 3000
echo.
start "CodeGalaxy Backend" cmd /k "cd server && npm run dev"

REM Wait 3 seconds for backend to start
timeout /t 3 /nobreak

echo.
echo ^>^> Starting Frontend Client on Port 5174
echo.
start "CodeGalaxy Frontend" cmd /k "cd client && npm run dev"

echo.
echo ================================
echo ^>^> Servers Started!
echo ================================
echo.
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:5174
echo.
echo Close the command windows to stop the servers.
echo.
pause
