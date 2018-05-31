/* Copyright (c) 2018 Patrick Krause and other contributors, MIT License */

'use strict';

var PORT_BUSINESS = process.env.PORT_BUSINESS || 5003;

var Seneca = require('seneca')({tag: 'business'})
  .listen({port: PORT_BUSINESS});

Seneca.add('role:demo,cmd:hello', (msg, reply) => { 
    reply(null, {answer: "Hello world!"})
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

console.info("Businesslogic microservice up and running!");



