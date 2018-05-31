/* Copyright (c) 2018 Patrick Krause and other contributors, MIT License */

'use strict';

var PORT_API_GATEWAY_WEBSERVER = process.env.PORT_API_GATEWAY_WEBSERVER || 5001;
var PORT_API_GATEWAY = process.env.PORT_API_GATEWAY || 5002;
var PORT_BUSINESS = process.env.PORT_BUSINESS || 5003;

var hapi = require('hapi'); // Webserver
var hapiPino = require('hapi-pino'); // Logger
var hapiSwagger = require('hapi-swagger'); // OpenApi/Swagger
var inert = require('inert'); // access static files on server (for OpenApi/Swagger)
var vision = require('vision'); // templates rendering support for hapi (for OpenApi/Swagger)
var pack = require('./package'); // access package.json
var seneca = require('seneca')({tag: 'api-gateway'})
  .client({port: PORT_BUSINESS})
  .listen({port: PORT_API_GATEWAY});

var senecaPromise = require('bluebird');
var act = senecaPromise.promisify(seneca.act, {context: seneca});  

// create a webserver 
const webserver = hapi.server({
    host: '0.0.0.0',
    port: PORT_API_GATEWAY_WEBSERVER,
    routes: {
        cors: true
        }
});

// NOT WORKING (async/await without bluebird)

// webserver.route({
//     method: 'GET',
//     path: '/api/demo4',
//     handler: async (request, h) => { 
//         const result = await seneca.act({role: 'demo', cmd: 'hello'});
//         console.log(result);
//         return result;
//     }
// });

// WORKING (promisified with bluebird)

// webserver.route({
//     method: 'GET',
//     path: '/api/demo3',
//     handler: function(request, h) { 
//         return act({role: 'demo', cmd: 'hello'})
//         .then(function (result) {
//             console.log(result);
//             return result;
//         })
//         .catch(function (err) {
//             console.log(err);
//             return err;
//         });
//     }
// });

// WORKING (async/await with promisified bluebird)

webserver.route({
    method: 'GET',
    path: '/api/demo',
    config: {
        tags: ['api'], // Swagger
    },
    handler: async (request, h) => { 
        var result = await act({role: 'demo', cmd: 'hello'});
        console.log(result);
        return result;
    }
});

// calc statistics
// example: http://127.0.0.1:5001/api/demo/calc/1.2,1.3,1.4
webserver.route({
    method: 'GET',
    path: '/api/demo/calc/{values}',
    config: {
        tags: ['api'], // Swagger
    },
    handler: async (request, h) => { 
        var s = decodeURIComponent(request.params.values);
        var result = await act({role: 'demo', cmd: 'calc', data: s});
        console.log(result);
        return result;
    }
});

// WORKING (using normal Promise)

// webserver.route({
//     method: 'GET',
//     path: '/api/demo',
//     handler: async (request, h) => { 

//         const promise = new Promise((resolve, reject) => {
//             seneca.act({role: 'demo', cmd: 'hello'}, 
//                 function (err, result) {
//                     if (err) 
//                         { reject(err); } 
//                     else 
//                         { resolve(result); }  
//             });
//         });

//         return promise;
//     }
// });

// WORKING

webserver.route({
    method: 'GET',
    path: '/api/simple',
    config: {
        tags: ['api'], // Swagger
    },
    handler: (request, h) => { 
        return "simple string";
    }
});

// Start the server

async function start() {

     // enable logging 
    
    await webserver.register({
        plugin: hapiPino,
        options: {
            prettyPrint: true,
            logEvents: ['response']
        }
    });

    // enable static file access (Inert -> for Swagger)

    await webserver.register({
        plugin: inert
    });

    // enable Vision (for Swagger)

    await webserver.register({
        plugin: vision
    });

    // enable OpenAPI/Swagger

    await webserver.register({
        plugin: hapiSwagger,
        options: {
            info: {
                title: 'OpenAPI (Swagger) Documentation',
                version: pack.version,
            }
        }
    });

    
    // start 

    await webserver.start();
    
    console.log(`API-Gateway up and running at: ${webserver.info.host}:${PORT_API_GATEWAY_WEBSERVER}`);   
    console.log(`OpenApi/Swagger: ${webserver.info.host}:${ PORT_API_GATEWAY_WEBSERVER}/documentation`);   
    console.log(`Test: ${webserver.info.host}:${PORT_API_GATEWAY_WEBSERVER}/api/demo/calc/1.2,1.3,1.4`);
    console.log('');   

};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

start();
