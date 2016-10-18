'use strict';
//eslint-disable-next-line no-process-env
process.env.NODE_ENV = "test";
require('../src/init-nconf');
var chai = require('chai');
var dirtyChai = require('dirty-chai');
chai.use(dirtyChai);

global.chai = chai;
global.expect = chai.expect;
global.assert = chai.assert;
global.should = chai.should();