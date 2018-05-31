rem STATIC-WEBSERVER
set PORT=5000
start node static-webserver/static-webserver.js 

rem API-GATEWAY
set PORT=5001
set PORT_API_GATEWAY=5002
start node api-gateway/api-gateway.js

rem BUSINESS
set PORT_BUSINESS=5003
start node business/business.js 

 
