/* Copyright (c) 2018 Patrick Krause and other contributors, MIT License */

var PORT_STATIC_WEBSERVER = process.env.PORT || 5000;

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

const webserver = new Hapi.Server({
    host: '0.0.0.0',
    port: PORT_STATIC_WEBSERVER,
    routes: {
        cors: true,
        files: {
            relativeTo: Path.join(__dirname, 'www')
        }
    }
});

const start = async () => {

    // enable logging "hapi-pino"-plugin (https://github.com/pinojs/hapi-pino)
    
    await webserver.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
            logEvents: ['response']
        }
    });

    // enable static files using "Inert"-plugin (https://github.com/hapijs/inert)

    await webserver.register(Inert);

    webserver.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true,
            }
        }
    });

    // starting the webserver
    
    try {
        await webserver.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log(`Static webserver running at: ${webserver.info.host}:${PORT_STATIC_WEBSERVER}`);

};

start();