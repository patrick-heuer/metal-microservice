const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server({
    port: 5000,
    routes: {
        cors: true,
        files: {
            relativeTo: Path.join(__dirname, 'www')
        }
    }
});

const start = async () => {

    // enable logging "hapi-pino"-plugin (https://github.com/pinojs/hapi-pino)
    
    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
            logEvents: ['response']
        }
    });

    // enable static files using "Inert"-plugin (https://github.com/hapijs/inert)

    await server.register(Inert);

    server.route({
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

    // starting the server
    
    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Static webserver running at:', server.info.uri);
};

start();