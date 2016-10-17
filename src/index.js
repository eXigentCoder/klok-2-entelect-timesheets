'use strict';
require('../src/init-nconf');
var getTimeSheetEntries = require('./get-time-sheet-entries');
var writeTimeSheetEntriesToFile = require('./write-time-sheet-entries-to-file');
let timeSheetEntries = getTimeSheetEntries();
writeTimeSheetEntriesToFile(timeSheetEntries);
process.exit(0);