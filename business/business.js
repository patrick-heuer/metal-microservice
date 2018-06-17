/* Copyright (c) 2018 Patrick Krause and other contributors, MIT License */

'use strict';

// CONSTS

var PORT_BUSINESS = process.env.PORT_BUSINESS || 5003;
var PORT_BUSINESS_REPL = process.env.PORT_BUSINESS_REPL || 10020; // maintanence telnet port

// USES

var Seneca = require('seneca')({tag: 'business'})
  .use('seneca-repl', {port: PORT_BUSINESS_REPL}) // REPL interface for telnet access
  .listen({port: PORT_BUSINESS});

// EVENT-HANDLER

Seneca.add('role:business,cmd:hello', DoHelloCat);

// input: data:"1.2,1.3,1.4"
// output: average, min, max
Seneca.add('role:business,cmd:calc', DoCalc);


// METHODS

function DoHelloCat (msg, reply) {
    reply(null, {answer: "Hello world!"})
}

function DoCalc (msg, reply) {

    var values = msg.data.split(",").map(Number);
    var sum = values.reduce((previous, current) => current += previous); // To get the average, we have to sum up numbers and then divide by the number of values.
    var avg = sum / values.length;
    var max = Math.max(...values); // ... = Using spread operator (ES6)
    var min = Math.min(...values); // ... = Using spread operator (ES6)

    reply(null, {answer: "avg=" + avg.toString() + " max=" + max.toString() + " min=" + min.toString()})
}

console.info("Businesslogic microservice up and running!");



