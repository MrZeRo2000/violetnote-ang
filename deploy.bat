CALL buildprod.bat
RMDIR /S /Q D:\prj\apache-tomcat-9.0.24\work\Catalina\localhost\violetnote-ang\
RMDIR /S /Q D:\prj\apache-tomcat-9.0.24\webapps\violetnote-ang\
XCOPY dist\violetnote-ang\*.* D:\prj\apache-tomcat-9.0.24\webapps\violetnote-ang\
XCOPY dist\violetnote-ang\assets\env.json D:\prj\apache-tomcat-9.0.24\webapps\violetnote-ang\assets\
