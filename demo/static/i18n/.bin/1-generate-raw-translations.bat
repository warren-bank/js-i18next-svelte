@echo off

rem :: https://github.com/warren-bank/node-translate-android-strings

rem :: declare variables "IBM_TRANSLATOR_API_KEY" and "IBM_TRANSLATOR_API_URL"
call "%USERPROFILE%\IBM_TRANSLATOR_API_CREDENTIALS.bat"

set input_file=%~dp0.\data\xml_input\strings.xml
set output_dir=%~dp0.\data\raw_translations
set log_file=%~dpn0.log

if exist "%output_dir%" rmdir /Q /S "%output_dir%"
mkdir "%output_dir%"

call translate-android-strings -i "en" -f "%input_file%" -d "%output_dir%" --debug >"%log_file%" 2>&1
