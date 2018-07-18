CALL termsetup.bat
RMDIR /S /Q dist\violetnote-ang 
ng build --prod --base-href=/violetnote-ang/
