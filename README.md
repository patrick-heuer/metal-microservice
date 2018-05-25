# metal-microservice

(c) 2018 by Patrick Krause<br><br>
Microservices going heavy metal! Microservice test platform, using Seneca.js framework for high scaleable and robust node.js services.<br><br>
Developed & tested under Windows 10! 

Microservices

1. static-webserver (provides static web content for single page application)
2. api-gateway (external access to the system via REST / HTTP)
3. demo (demo use cases / businesslogic)

SETUP
======

1. install Node.JS 8 LTS:

https://nodejs.org/en/

2. install npm packages for all microservices

install.cmd

3. start all microservices

start.cmd

4. stop all microservices

stop.cmd
 
5. tests

- static webpages -> browser

  http://127.0.0.1:5000

- api-gateway -> fiddler

http://127.0.0.1:5001/api/demo

