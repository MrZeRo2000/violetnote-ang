CALL buildprod.bat
RMDIR /S /Q D:\prj\apache-tomcat-8.0.30\work\Catalina\localhost\violetnote-ang\
RMDIR /S /Q D:\prj\apache-tomcat-8.0.30\webapps\violetnote-ang\
XCOPY dist\violetnote-ang\*.* D:\prj\apache-tomcat-8.0.30\webapps\violetnote-ang\
