'use strict';

var seneca = require('seneca')({tag: 'demo'})
  .listen({port: '5003'});

seneca.add('role:demo,cmd:hello', (msg, reply) => { 
    reply(null, {answer: "Hello world!"})
});

seneca.add('role:demo,cmd:queue', (msg, reply) => { 
    reply(null, {answer: "Hello world queued!"})
});

console.info("Demo microservice up and running!");



