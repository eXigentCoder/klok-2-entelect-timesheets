'use strict';
require('fs');
var nconf = require('nconf');
nconf.argv()
    .env()
    .defaults({NODE_ENV: 'development'});
var environment = nconf.get('NODE_ENV');
//eslint-disable-next-line no-process-env
process.env.NODE_ENV = environment;
var defaultFilePath = './config/default.json';
var envFilePath = './config/' + environment + '.json';
nconf.file('envFile', envFilePath);
nconf.file('defaultFile', defaultFilePath);