'use strict';

var seneca = require('seneca')({tag: 'demo'})
  .listen({port: '5003'});

seneca.add('role:demo,cmd:hello', (msg, reply) => { 
    console.log("");
    console.log("request-message: " + JSON.stringify(msg));
    reply(null, {answer: "Hello world!"})
});

seneca.add('role:demo,cmd:queue', (msg, reply) => { 
    console.log("");
    console.log("request-message: " + JSON.stringify(msg));
    reply(null, {answer: "Hello world queued!"})
});

console.info("Demo microservice up and running!");
console.log("");
console.log(seneca.id);
console.log(seneca.tag);
console.log(seneca.version);


