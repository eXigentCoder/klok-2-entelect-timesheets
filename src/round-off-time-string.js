'use strict';
var _ = require("lodash");
var util = require('util');

module.exports = function roundOffTimeString(hhmmString) {
    if (!_.isString(hhmmString)) {
        throw new Error(util.format("Argument provided must be a string but was %j", hhmmString));
    }
    let timeParts = hhmmString.split(':');
    if (timeParts.length !== 2) {
        throw new Error("hhmmString must be in the format x:xx where the x's are numbers");
    }
    let hours = Number(timeParts[0]);
    let minutes = Number(timeParts[1]);
    if (hours === 0 && minutes === 0) {
        return null;
    }
    minutes = ((minutes + 7.5) / 15 | 0) * 15 % 60;
    hours = ((((Number(timeParts[1]) / 105) + 0.5) | 0) + hours) % 24;
    if (hours === 0 && minutes === 0) {
        minutes = 15;
    }
    return {
        hours: hours,
        minutes: minutes
    };
};