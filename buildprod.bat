CALL termsetup.bat
RMDIR /S /Q dist\violetnote-ang 
ng build --configuration production --base-href=/violetnote-ang/
