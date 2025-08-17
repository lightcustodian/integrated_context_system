@echo off
REM BMAD Context Engineering MVP Setup Script for Windows

echo Setting up BMAD Context Engineering MVP...

REM Check for Docker
where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Docker is not installed. Please install Docker Desktop first.
    exit /b 1
)

REM Check for Docker Compose
where docker-compose >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Docker Compose is not installed. Please install Docker Desktop first.
    exit /b 1
)

REM Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Warning: Node.js is not installed. It's required for local development.
)

echo Prerequisites checked

REM Install server dependencies
echo Installing server dependencies...
cd server
call npm install
cd ..

REM Install client dependencies with legacy peer deps to resolve conflicts
echo Installing client dependencies...
cd client
call npm install --legacy-peer-deps
cd ..

REM Create data directory
echo Creating data directory...
if not exist "data" mkdir data

REM Build and start Docker container
echo Building Docker container...
docker-compose build

echo Starting services...
docker-compose up -d

REM Wait for services to be ready
echo Waiting for services to start...
timeout /t 5 /nobreak >nul

REM Check if services are running
curl -s http://localhost:3000/health >nul 2>nul
if %errorlevel% equ 0 (
    echo Server is running!
) else (
    echo Warning: Server might still be starting. Check logs with: docker-compose logs -f
)

echo.
echo Setup complete!
echo.
echo Access the web interface at: http://localhost:3000
echo View logs: docker-compose logs -f
echo Stop services: docker-compose down
echo Restart services: docker-compose restart
echo.
echo Happy coding!

pause