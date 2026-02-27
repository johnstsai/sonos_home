@echo off
REM Sonos Home - Start Application (Windows)
REM Double-click to run

setlocal enabledelayedexpansion

cd /d "%~dp0"

REM Check if virtual environment exists
if not exist "venv" (
    echo Virtual environment not found. Installing...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Check if Flask is installed
python -c "import flask" >nul 2>&1
if errorlevel 1 (
    echo Installing dependencies...
    pip install -q -r requirements.txt
)

REM Start the application
echo.
echo Starting Sonos Home...
echo Opening http://localhost:5050 in your browser...
echo.
python run.py

pause
