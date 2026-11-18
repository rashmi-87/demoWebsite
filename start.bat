@echo off
setlocal
cd /d "%~dp0"

echo ============================================
echo   DSA - setup and run
echo ============================================
echo.

echo [1/4] Installing root tools (concurrently)...
call npm install || goto :err

echo [2/4] Installing server dependencies...
cd server
call npm install || goto :err
cd ..

echo [3/4] Installing client dependencies...
cd client
call npm install || goto :err
cd ..

echo [4/4] Starting server (http://localhost:4000) and app (http://localhost:5173)...
echo.
echo When it says "Local: http://localhost:5173", open that in your browser.
echo Press Ctrl+C in this window to stop.
echo.
call npm run dev

goto :eof

:err
echo.
echo Something failed above. Scroll up to read the error.
echo You can also run the steps manually - see README.md.
pause
