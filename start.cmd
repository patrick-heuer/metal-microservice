rem RABBITMQ/AMQP
set AMQP_URL=amqp://guest:guest@127.0.0.1:5672

rem STATIC-WEBSERVER
set PORT=5000
start node static-webserver/static-webserver.js 

rem API-GATEWAY
set PORT=5001
set PORT_API_GATEWAY=5002
start node api-gateway/api-gateway.js

rem BUSINESS
set PORT_BUSINESS=5003
set PORT_BUSINESS_REPL=10020
start node business/business.js 

rem WORKER
set PORT_WORKER=5004
set PORT_WORKER_REPL=10021
start node worker/worker.js

 
