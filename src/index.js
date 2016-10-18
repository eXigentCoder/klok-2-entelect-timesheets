'use strict';
require('../src/init-nconf');
console.log("Welcome to Klok 2 Entelect Time Sheets, By Ryan Kotzen");
var getTimeSheetEntries = require('./get-time-sheet-entries');
var writeTimeSheetEntriesToFile = require('./write-time-sheet-entries-to-file');
let timeSheetEntries = getTimeSheetEntries();
writeTimeSheetEntriesToFile(timeSheetEntries);
console.log("All Done!");
process.exit(0);