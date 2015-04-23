//@module

var Inheritance = require("modules/meta/inheritance");

exports.getNow = function() {
    var date = new Date();
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}

exports.changeHour = function(time, delta) {
    time.setHours(time.getHours() + delta);
    return time;
}

exports.changeDay = function(time, delta) {
    time.setDate(time.getDate() + delta);
    return time;
}

exports.changeMonth = function(time, delta) {
    time.setMonth(time.getMonth() + delta);
    return time;
}

exports.changeYear = function(time, delta) {
    time.setFullYear(time.getFullYear() + delta);
    return time;
}

exports.getHour = function(time) {
    return time.getHours();
}

exports.getDay = function(time) {
    return time.getDate();
}

exports.getMonth = function(time) {
    return time.getMonth();
}

exports.getYear = function(time) {
    return time.getFullYear();
}

exports.sameHour = function(time1, time2) {
    return (time1.getHours() == time2.getHours())
        && exports.sameDay(time1, time2);
}

exports.sameDay = function(time1, time2) {
    return (time1.getDate() == time2.getDate())
        && exports.sameMonth(time1, time2);
}

exports.sameMonth = function(time1, time2) {
    return (time1.getMonth() == time2.getMonth())
        && exports.sameYear(time1, time2);
}

exports.sameYear = function(time1, time2) {
    return (time1.getFullYear() == time2.getFullYear());
}

exports.toDayString = function(time) {
    return getMonth(time.getMonth()) + ' ' + time.getDate() + ', '
        + time.getFullYear();
}

exports.toMonthString = function(time) {
    return getMonth(time.getMonth()) + ' ' + time.getFullYear();
}

exports.toYearString = function(time) {
    return ''+time.getFullYear();
}

var getMonth = function(month) {
    switch (month) {
        case 0: return 'January';
        case 1: return 'February';
        case 2: return 'March';
        case 3: return 'April';
        case 4: return 'May';
        case 5: return 'June';
        case 6: return 'July';
        case 7: return 'August';
        case 8: return 'September';
        case 9: return 'October';
        case 10: return 'November';
        case 11: return 'December';
    }
}
