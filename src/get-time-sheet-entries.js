'use strict';
var _ = require('lodash');
var excel = require('xlsx');
var moment = require('moment');
var util = require('util');
var nconf = require('nconf');
var roundOffTimeString = require("./round-off-time-string");
module.exports = function getTimeSheetEntries() {
    var workbook = excel.readFile(nconf.get('inputFile'));
    var sheetNames = Object.keys(workbook.Sheets);
    var firstSheet = workbook.Sheets[sheetNames[0]];
    var cellIds = Object.keys(firstSheet);
    var ignoredCells = ['!ref', '!merges'];
    var defaultComment = nconf.get('defaultComment');
    cellIds = cellIds.filter(function (id) {
        return ignoredCells.indexOf(id) < 0;
    });
    var data = cellIds.map(function (id) {
        var columnParts = id.split(/\d/g).filter(function (part) {
            return Boolean(part);
        });
        var rowParts = id.split(/[a-zA-Z]/g).filter(function (part) {
            return Boolean(part);
        });
        return {
            row: rowParts.join(),
            col: columnParts.join(),
            value: firstSheet[id].v,
            text: firstSheet[id].w
        };
    });
    var rows = _.groupBy(data, 'row');
    var minEntryColumnCount = rows[2].length;
    var entryRows = [];
    var commentRows = [];
    Object.keys(rows).forEach(function (id) {
        let row = rows[id];
        if (row.length >= minEntryColumnCount) {
            entryRows.push(row);
        } else {
            commentRows.push(row);
        }
    });
    var comments = [];
    commentRows = _.flatten(commentRows);
    var processingComment;
    commentRows.forEach(function (row) {
        if (typeof row.value === 'number') {
            processingComment = {
                date: moment(row.text, nconf.get('inputDateFormat')).format('YYYY-MM-DD')
            };
        } else if (!processingComment.project) {
            processingComment.project = row.value.split(' (')[0];
        } else {
            processingComment.comment = row.value;
            comments.push(processingComment);
        }
    });
    let headers = {};
    let projectCategories = {};
    let timeSheetEntries = [];
    var headersToIgnore = ['Project Code', 'Billable', 'Total Hours', 'Billable Amount'];
    entryRows.forEach(function (row) {
        let isHeaderRow = row[0].row === '1';
        if (isHeaderRow) {
            return processHeaderRow(row);
        }
        for (var i = 0; i < minEntryColumnCount; i++) {
            var cell = row[i];
            if (cell.col === "A") {
                projectCategories[cell.row] = cell.text;
                continue;
            }
            cell.header = headers[cell.col];
            if (headersToIgnore.indexOf(cell.header) >= 0) {
                continue;
            }
            cell.project = projectCategories[cell.row];
            addCellAsTimesheetEntry(cell);
        }
    });
    return timeSheetEntries;

    function processHeaderRow(row) {
        for (var i = 0; i <= minEntryColumnCount; i++) {
            var cell = row[i];
            headers[cell.col] = cell.text;
        }
    }

    function addCellAsTimesheetEntry(cell) {
        if (cell.value === 0) {
            return;
        }
        if (cell.project === 'Totals') {
            return;
        }
        var projectParts = cell.project.split(' > ');
        if (projectParts.length > 2) {
            throw new Error(util.format('Project name "%s" contained %s parts after splitting by ">", expected 2.', cell.project, projectParts.length));
        }
        var rounded = roundOffTimeString(cell.text);
        if (!rounded) {
            console.warn(util.format("Cell with null time %j", cell));
            return;
        }
        var date = cell.header.split(' ')[1];
        var comment = comments.filter(function (commentObject) {
            if (commentObject.date !== date) {
                return false;
            }
            return commentObject.project === cell.project;
        });
        var entry = {
            Date: date,
            Project: projectParts[0],
            Category: projectParts[1],
            Hours: rounded.hours,
            Minutes: rounded.minutes,
            Billable: 'No', //Klok marks certain projects as billable, rather than work blocks, so maybe @billable from comment?
            Description: defaultComment,
            TicketNumber: '', // maybe do something with the comment using a # maybe
            Sentiment: 'Neutral' //perhaps parse the comment for a smiley?  :( :| :)
        };
        if (comment[0]) {
            entry.Description = comment[0].comment;
        }
        timeSheetEntries.push(entry);
    }
};
