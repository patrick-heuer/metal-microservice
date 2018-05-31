
rem ***************************
rem SET ENVIRONMENT VARIABLES
rem ***************************

set PORT_STATIC_WEBSERVER=5000
set PORT_API_GATEWAY_WEBSERVER=5001
set PORT_API_GATEWAY=5002
set PORT_BUSINESS=5003

rem ***************************
rem START ALL MICROSERVICES
rem ***************************

start node static-webserver/static-webserver.js 
start node business/business.js 
start node api-gateway/api-gateway.js 
