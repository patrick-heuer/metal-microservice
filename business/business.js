
'use strict';

//var R = require("r-script");
var Seneca = require('seneca')({tag: 'demo'})
  .listen({port: '5003'});

Seneca.add('role:demo,cmd:hello', (msg, reply) => { 
    reply(null, {answer: "Hello world!"})
});

Seneca.add('role:demo,cmd:queue', (msg, reply) => { 
    reply(null, {answer: "Hello world queued!"})
});

// input: "1.2,1.3,1.4"
// output: average, min, max
Seneca.add('role:demo,cmd:calc', (msg, reply) => { 

    var values = msg.data.split(",").map(Number);
    var sum = values.reduce((previous, current) => current += previous); // To get the average, we have to sum up numbers and then divide by the number of values.
    var avg = sum / values.length;
    var max = Math.max(...values); // ... = Using spread operator (ES6)
    var min = Math.min(...values); // ... = Using spread operator (ES6)

    reply(null, {answer: "avg=" + avg.toString() + " max=" + max.toString() + " min=" + min.toString()})
});



console.info("Demo microservice up and running!");



