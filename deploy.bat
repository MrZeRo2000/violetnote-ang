CALL buildprod.bat
RMDIR /S /Q D:\prj\apache-tomcat-9.0.14\work\Catalina\localhost\violetnote-ang\
RMDIR /S /Q D:\prj\apache-tomcat-9.0.14\webapps\violetnote-ang\
XCOPY dist\violetnote-ang\*.* D:\prj\apache-tomcat-9.0.14\webapps\violetnote-ang\
