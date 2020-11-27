cd C:\workspace\mbs\Engine\WebContent\Sites\seoul\mobile
rmdir /q /s D:\workspace\SBMS\html
rmdir /q /s D:\workspace\SBMS\client
XCOPY C:\workspace\mbs\Engine\WebContent\Sites\seoul\mobile\html\*.* D:\workspace\SBMS\html\ /E /K /Y
XCOPY C:\workspace\mbs\Engine\WebContent\Sites\seoul\mobile\client\assets\*.* D:\workspace\SBMS\client\assets\ /E /K /Y



Y:
rmdir /q /s Y:\publish
mkdir Y:\publish
XCOPY D:\workspace\SBMS\client\*.* Y:\publish\client\ /E /K /Y
XCOPY D:\workspace\SBMS\html\*.* Y:\publish\html\ /E /K /Y