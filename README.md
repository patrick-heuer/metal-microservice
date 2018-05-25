![Logo](https://github.com/PKrause79/metal-microservice/blob/master/metal-microservice-logo.png)

# metal-microservice

> (c) 2018 by Patrick Krause
> 
> Microservices going heavy metal! Microservice test platform for LOB (Line Of Business) 
> applications - using Seneca.js framework for high scaleable and robust services.
> 
> Developed & tested under Windows 10, using Node.js / JavaScript

## Microservices

1. static-webserver (provides static web content for single page application)
2. api-gateway (external access to the system via REST / HTTP)
3. demo (demo use cases / businesslogic)

## Setup

install Node.JS 8 LTS:

__https://nodejs.org/en/__

install npm packages for all microservices:

__install.cmd__

## Running

start all microservices:

__start.cmd__

stop all microservices:

__stop.cmd__
 
## Test

static webpages -> browser

  __http://127.0.0.1:5000__

api-gateway -> fiddler/postman/browser

  __http://127.0.0.1:5001/api/demo__

