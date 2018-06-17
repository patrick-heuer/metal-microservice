/* Copyright (c) 2018 Patrick Krause and other contributors, MIT License */

'use strict';

// CONSTS

var PORT_WORKER = process.env.PORT_WORKER || 5004;
var PORT_WORKER_REPL = process.env.PORT_WORKER_REPL || 10021; // maintanence telnet port
var AMQP_URL = process.env.AMQP_URL || 'amqp://guest:guest@127.0.0.1:5672' ; // RabbitMQ-Host

// USES

var Lru = require('lru-cache');
var Seneca = require('seneca')({tag: 'worker'})
  .use('seneca-amqp-transport')
  .use('seneca-repl', {port: PORT_WORKER_REPL}) // REPL interface for telnet access
  .listen({
    type: 'amqp',
    pin: 'cmd:worker,collect:*',
    url: AMQP_URL
  });

// EVENT-HANDLER

Seneca.add('role:worker,collect:dog', DoCollectDogs);

// VARIABLES

var info_cache = Lru(100); // max 100 entrys in cache

// METHODS

function DoCollectDogs (msg, reply) {

    console.info(msg.data);

    var name = msg.data
    var data = info_cache.get(name) || {}
    data[name] = msg.data
    info_cache.set(name, data)

    console.info(`Dog name ${name} added into cache`);

    reply()
}


console.info("Worker microservice up and running!");



