'use strict';
require('../init');
var roundOffTimeString = require('../../src/round-off-time-string');

describe('Round Off Time String', function () {
    function call(arg) {
        return roundOffTimeString.bind(null, arg);
    }

    it("Should throw an error if argument was not a string", function () {
        var argsThatShouldThrow = [
            0, 1, true, false, NaN, undefined, null, {}, []
        ];
        argsThatShouldThrow.forEach(function (arg) {
            expect(call(arg)).to.throw();
        });
    });
    it("Should throw an error if argument was a string without exactly one ':' character", function () {
        var argsThatShouldThrow = [
            "", "12:12:12", "1212"
        ];
        argsThatShouldThrow.forEach(function (arg) {
            expect(call(arg)).to.throw();
        });
    });
    it("Test cases should round correctly", function () {
        var testCases = [
            {input: "00:00", expected: null},
            {input: "00:01", expected: {hours: 0, minutes: 15}},
            {input: "00:14", expected: {hours: 0, minutes: 15}},
            {input: "00:15", expected: {hours: 0, minutes: 15}},
            {input: "00:16", expected: {hours: 0, minutes: 15}},
            {input: "00:22", expected: {hours: 0, minutes: 15}},
            {input: "00:23", expected: {hours: 0, minutes: 30}},
            {input: "00:29", expected: {hours: 0, minutes: 30}},
            {input: "00:30", expected: {hours: 0, minutes: 30}},
            {input: "00:31", expected: {hours: 0, minutes: 30}},
            {input: "00:37", expected: {hours: 0, minutes: 30}},
            {input: "00:38", expected: {hours: 0, minutes: 45}},
            {input: "00:39", expected: {hours: 0, minutes: 45}},
            {input: "00:44", expected: {hours: 0, minutes: 45}},
            {input: "00:45", expected: {hours: 0, minutes: 45}},
            {input: "00:46", expected: {hours: 0, minutes: 45}},
            {input: "00:52", expected: {hours: 0, minutes: 45}},
            {input: "00:53", expected: {hours: 1, minutes: 0}},
            {input: "00:54", expected: {hours: 1, minutes: 0}},
            {input: "00:59", expected: {hours: 1, minutes: 0}},
            {input: "00:60", expected: {hours: 1, minutes: 0}},
            {input: "00:61", expected: {hours: 1, minutes: 0}},
            {input: "01:00", expected: {hours: 1, minutes: 0}},
            {input: "01:01", expected: {hours: 1, minutes: 0}},
            {input: "01:07", expected: {hours: 1, minutes: 0}},
            {input: "01:08", expected: {hours: 1, minutes: 15}},
            {input: "01:14", expected: {hours: 1, minutes: 15}},
            {input: "01:15", expected: {hours: 1, minutes: 15}},
            {input: "01:16", expected: {hours: 1, minutes: 15}},
            {input: "01:22", expected: {hours: 1, minutes: 15}},
            {input: "01:23", expected: {hours: 1, minutes: 30}},
            {input: "01:29", expected: {hours: 1, minutes: 30}},
            {input: "01:30", expected: {hours: 1, minutes: 30}},
            {input: "01:31", expected: {hours: 1, minutes: 30}},
            {input: "01:37", expected: {hours: 1, minutes: 30}},
            {input: "01:38", expected: {hours: 1, minutes: 45}},
            {input: "01:39", expected: {hours: 1, minutes: 45}},
            {input: "01:44", expected: {hours: 1, minutes: 45}},
            {input: "01:45", expected: {hours: 1, minutes: 45}},
            {input: "01:46", expected: {hours: 1, minutes: 45}},
            {input: "01:52", expected: {hours: 1, minutes: 45}},
            {input: "01:53", expected: {hours: 2, minutes: 0}},
            {input: "01:54", expected: {hours: 2, minutes: 0}},
            {input: "01:59", expected: {hours: 2, minutes: 0}},
            {input: "01:60", expected: {hours: 2, minutes: 0}},
            {input: "01:61", expected: {hours: 2, minutes: 0}}
        ];
        testCases.forEach(function (testCase) {
            let result = roundOffTimeString(testCase.input);
            expect(result, testCase.input).to.deep.equal(testCase.expected);
        });
    });
});
