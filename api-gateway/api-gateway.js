'use strict';

var hapi = require('hapi');
var seneca = require('seneca')({tag: 'api-gateway'})
  .client({port: 5003})
  .listen({port: 5002});

var senecaPromise = require('bluebird');
var act = senecaPromise.promisify(seneca.act, {context: seneca});  

// create a webserver 
const webserver = hapi.server({
    port: 5001,
    routes: {
        cors: true
        }
});

// NOT WORKING (async/await without bluebird)

webserver.route({
    method: 'GET',
    path: '/api/demo4',
    handler: async (request, h) => { 
        const result = await seneca.act({role: 'demo', cmd: 'hello'});
        console.log(result);
        return result;
    }
});

// WORKING (promisified with bluebird)

webserver.route({
    method: 'GET',
    path: '/api/demo3',
    handler: function(request, h) { 
        return act({role: 'demo', cmd: 'hello'})
        .then(function (result) {
            console.log(result);
            return result;
        })
        .catch(function (err) {
            console.log(err);
            return err;
        });
    }
});

// WORKING (async/await with promisified bluebird)

webserver.route({
    method: 'GET',
    path: '/api/demo2',
    handler: async (request, h) => { 
        const result = await act({role: 'demo', cmd: 'hello'});
        console.log(result);
        return result;
    }
});

// WORKING (using normal Promise)

webserver.route({
    method: 'GET',
    path: '/api/demo',
    handler: async (request, h) => { 

        const promise = new Promise((resolve, reject) => {
            seneca.act({role: 'demo', cmd: 'hello'}, 
                function (err, result) {
                    if (err) 
                        { reject(err); } 
                    else 
                        { resolve(result); }  
            });
        });

        return promise;
    }
});

// WORKING

webserver.route({
    method: 'GET',
    path: '/api/simple',
    handler: (request, h) => { 
        return "simple string";
    }
});

// Start the server

async function start() {

     // enable logging "hapi-pino"-plugin
    
     await webserver.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
            logEvents: ['response']
        }
    });

    
    // start the webserver

    await webserver.start();

    console.log('API-Gateway up and running at:', webserver.info.uri);   

};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

start();
