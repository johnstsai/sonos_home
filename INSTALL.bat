@echo off
REM Sonos Home - Installation (Windows)
REM Double-click to run

setlocal enabledelayedexpansion

cd /d "%~dp0"

cls
echo ==========================================
echo Sonos Home - Installation
echo ==========================================
echo.

REM Check Python version
for /f "tokens=*" %%i in ('python --version 2^>^&1') do set "PY_VERSION=%%i"
echo %PY_VERSION%
echo.

REM Create virtual environment
echo Creating virtual environment...
python -m venv venv

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Upgrade pip
echo Upgrading pip...
pip install -q --upgrade pip

REM Install requirements
echo Installing dependencies...
pip install -q -r requirements.txt

REM Create .env if it doesn't exist
if not exist ".env" (
    echo Creating .env file...
    copy .env.example .env >nul
)

cls
echo ==========================================
echo Sonos Home - Installation Complete!
echo ==========================================
echo.
echo Next: Double-click START.bat to launch
echo.
pause
