'use strict';
var excel = require('xlsx');
var moment = require('moment');
var util = require('util');
var nconf = require('nconf');
var path = require('path');

var cellMappings = {
    Date: {col: 'A', type: 'd'},
    Project: {col: 'B', type: 's'},
    Category: {col: 'C', type: 's'},
    Hours: {col: 'D', type: 'n'},
    Minutes: {col: 'E', type: 'n'},
    Billable: {col: 'F', type: 's'},
    Description: {col: 'G', type: 's'},
    TicketNumber: {col: 'H', type: 's'},
    Sentiment: {col: 'I', type: 's'}
};
module.exports = function writeTimeSheetEntriesToFile(entries) {
    console.log("Generating output excel file ...");
    console.log("\tLoading template file ...");
    var workbook = excel.readFile(nconf.get('templateFile'));
    console.log("\t\tDone.");
    var sheetNames = Object.keys(workbook.Sheets);
    var firstSheet = workbook.Sheets[sheetNames[0]];
    var row = 1;
    entries.forEach(function (entry) {
        row++;
        Object.keys(entry).forEach(function (key) {
            var mapping = cellMappings[key];
            var cellId = mapping.col + row;
            var value = entry[key];
            firstSheet[cellId] = {
                t: mapping.type,
                v: value
            };
        });
    });
    firstSheet['!ref'] = 'A1:I' + row;
    var fileDate = moment().format(nconf.get('outputFileDateFormat'));
    console.log("\tDone.");
    console.log("Writing output excel file to disk ...");
    var filePath = util.format('%s%s.xlsx', nconf.get('outputFilePrefix'), fileDate);
    excel.writeFile(workbook, filePath);
    console.log("\tDone.");
    console.log("File location \t" + path.join(__dirname, '../', filePath));
};