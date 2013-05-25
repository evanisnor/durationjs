'use strict';
/*
duration.js
A JavaScript library for parsing and manipulating ISO 8601 formatted duration strings.

Licensed under The MIT License (MIT)
*/

/**
 * @constructor
 */
var Duration = function() {
	this.seconds = 0;
	this._beginning = new Date(Date.now());
	this._end = this._beginning;

	if (arguments.length == 1) {
		this.parseRepresentation(arguments[0]);
	}
	else if (arguments.length == 2) {
		this.parseDates(arguments[0], arguments[1]);
	}
	else if (arguments.length > 2) {
		throw new Error(Duration.Error.UnexpectedArguments);
	}
}

Duration.prototype.parseRepresentation = function(representation) {
	if (typeof representation === 'undefined' || representation == undefined || representation == '') {
		representation = 0;
	}
	
	if (typeof representation === 'number' && representation < 0) {
		throw new Error(Duration.Error.NegativeValue);
	}
	else if (typeof representation === 'number') {
		this.seconds = representation;
	}
	else {
		var isSupportedFormat = false;
		for (var format in Duration.DurationFormat) {
			var pattern = Duration.DurationFormat[format].pattern;
			var parser = Duration.DurationFormat[format].parser;
			if (pattern.test(representation)) {
				isSupportedFormat = true;
				this.seconds = parser(this.seconds, representation.match(pattern));
				break;
			}
		}

		if (!isSupportedFormat) {
			throw new Error(Duration.Error.UnexpectedFormat);
		}
	}

	if (isNaN(this.seconds)) {
		throw new Error(Duration.Error.Overflow);
	}
	
	this._end = new Date(this._beginning.getTime() + (this.seconds * 1000));
}

Duration.prototype.parseDates = function(first, second) {
	if (first instanceof Date && second instanceof Date && Duration.isValidDate(first) && Duration.isValidDate(second)) {
		this._beginning = first;
		this._end = second;
		this.seconds = Math.abs((second.getTime() - first.getTime())) / 1000;
	}
	else {
		throw new Error(Duration.Error.InvalidDateObject);
	}
}

Duration.prototype.setStartDate = function(date) {
	this.parseDates(date, this._end);
	if (date.getTime() > this._end.getTime()) {
		this._beginning = this._end;
		this._end = date;
	}
	else {
		this._beginning = date;
	}
}

Duration.prototype.setEndDate = function(date) {
	this.parseDates(this._beginning, date);
	if (date.getTime() < this._beginning.getTime()) {
		this._end = this._beginning;
		this._beginning = date;
	}
	else {
		this._end = date;
	}
}

/* Calendar values */

/**
 * @constructor
 */
/*Duration.Calendar = function(date) {
	this.date = date;
}

Duration.prototype.Calendar = function() {
	return new Duration.Calendar();
}

Duration.Calendar.now = function() {
	return new Duration.Calendar(Date.now());
}

Duration.Calendar.prototype.Seconds = {
	per : {
		Minute : 60,
		Hour : 60 * 60,
		Day : 60 * 60 * 24,
		Week : 60 * 60 * 24 * 7,
		Month : 60 * 60 * 24 * 30.4368,
		Year : 60 * 60 * 24 * 365.242
	}
};

Duration.Calendar.prototype.Minutes = {
	per : {
		Hour : 60,
		Day : 60 * 24,
		Week : 60 * 24 * 7,
		Month : 60 * 24 * 30.4368,
		Year : 60 * 24 * 365.242
	}
};

Duration.Calendar.prototype.Hours = {
	per : {
		Day : 24,
		Week : 24 * 7,
		Month : 24 * 30.4368,
		Year : 24 * 365.242
	}
};

Duration.Calendar.prototype.Days = {
	per : {
		Week : 7,
		Month : 30.4368,
		Year : 365.242
	}
};

Duration.Calendar.prototype.Weeks = {
	per : { 
		Month : 4.34812,
		Year : 52.1775
	}
};

Duration.Calendar.prototype.Months = {
	per : {
		Year : 12
	}
}

Duration.Calendar.getDaysThisMonth = function(date) {
	var daysThisMonth = 0;
	switch (date.getMonth()) {
		case 0 : 
			daysThisMonth = 31;
		case 1 : 
			daysThisMonth = (new Date(date.getYear(), 1, 29).getMonth() == 1) ? 29 : 28;
		case 2 : 
			daysThisMonth = 31;
		case 3 : 
			daysThisMonth = 30;
		case 4 : 
			daysThisMonth = 31;
		case 5 : 
			daysThisMonth = 30;
		case 6 : 
			daysThisMonth = 31;
		case 7 : 
			daysThisMonth = 31;
		case 8 : 
			daysThisMonth = 30;
		case 9 : 
			daysThisMonth = 31;
		case 10 : 
			daysThisMonth = 30;
		case 11 : 
			daysThisMonth = 31;
	}
	return daysThisMonth;
}

Duration.Calendar.getDaysThisYear = function(date) {
	return (new Date(date.getYear(), 1, 29).getMonth() == 1) ? 366 : 365;
}*/

/* Error Messages */

Duration.Error = {}

Duration.Error.UnexpectedFormat = "Unexpected duration format. Refer to ISO 8601.";

Duration.Error.NegativeValue = "Cannot create a negative duration.";

Duration.Error.Overflow = "Cannot represent a duration that large. Float overflow.";

Duration.Error.InvalidDateObject = "One or more arguments was not an instance of Date. Provide two Date objects.";

Duration.Error.UnexpectedArguments = "Unexpected arguments. Please provide a single duration or two Date objects.";

/* Parsing */

Duration.Parser = {}

Duration.Parser.Extended = function(seconds, match) {
	for (var groupIndex = 1; groupIndex < match.length; groupIndex++) {
		var value = parseInt(match[groupIndex], 10);
		var beginning = new Date(seconds * 1000);
		var end = new Date(seconds * 1000);
		
		if (groupIndex === 1) {
			end.setFullYear(beginning.getFullYear() + value);
			seconds += Math.abs((beginning.getTime() - end.getTime())) / 1000;
		}
		else if (groupIndex === 2) {
			if (value >= 12) {
				throw new Error(Duration.Error.UnexpectedFormat);
			}
			end.setMonth(beginning.getMonth() + value);
			seconds += Math.abs((beginning.getTime() - end.getTime())) / 1000;
		}
		else if (groupIndex === 3) {
			if (value > 31) {
				throw new Error(Duration.Error.UnexpectedFormat);
			}
			end.setDate(beginning.getDate() + value);
			seconds += Math.abs((beginning.getTime() - end.getTime())) / 1000;
		}
		else if (groupIndex === 4) {
			if (value >= 24) {
				throw new Error(Duration.Error.UnexpectedFormat);
			}
			end.setHours(beginning.getHours() + value);
			seconds += Math.abs((beginning.getTime() - end.getTime())) / 1000;
		}
		else if (groupIndex === 5) {
			if (value >= 60) {
				throw new Error(Duration.Error.UnexpectedFormat);
			}
			end.setMinutes(beginning.getMinutes() + value);
			seconds += Math.abs((beginning.getTime() - end.getTime())) / 1000;
		}
		else if (groupIndex === 6) {
			if (value >= 60) {
				throw new Error(Duration.Error.UnexpectedFormat);
			}
			seconds += value;
		}
	}
	return seconds;
}

Duration.Parser.Basic = Duration.Parser.Extended;

Duration.Parser.StandardWeeks = function(seconds, match) {
	for (var i = 1; i < match.length; i++) {
		var value = match[i];
		if (/\d+W/.test(value)) {
			var weeks = parseInt(value.replace('W', ''), 10);
			var beginning = new Date(seconds * 1000);
			var end = new Date(seconds * 1000);
			end.setDate(beginning.getDate() + (weeks * 7)); // Turn weeks into days
			seconds += Math.abs((beginning.getTime() - end.getTime())) / 1000;
		}
		else if (/\d+[A-Z]/.test(value)) {
			throw new Error(Duration.Error.UnexpectedFormat);
		}
	}
	return seconds;
}

Duration.Parser.Standard = function(seconds, match) {
	if (match[0] === 'P' || match[0] === 'PT') {
		throw new Error(Duration.Error.UnexpectedFormat);
	}
	
	var hasFoundT = false;
	for (var groupIndex = 1; groupIndex < match.length; groupIndex++) {
		var value = match[groupIndex];
		var beginning = new Date(seconds * 1000);
		var end = new Date(seconds * 1000);

		if (/T/.test(value)) {
			hasFoundT = true;
		}
		else if (/\d+Y/.test(value)) {
			var years = parseInt(value.replace('Y', ''), 10);
			end.setFullYear(beginning.getFullYear() + years);
			seconds += Math.abs((beginning.getTime() - end.getTime())) / 1000;
		}
		else if (/\d+M/.test(value) && !hasFoundT) {
			var months = parseInt(value.replace('M', ''), 10);
			end.setMonth(beginning.getMonth() + months);
			seconds += Math.abs((beginning.getTime() - end.getTime())) / 1000;
		}
		else if (/\d+D/.test(value)) {
			var days = parseInt(value.replace('D', ''), 10);
			end.setDate(beginning.getDate() + days);
			seconds += Math.abs((beginning.getTime() - end.getTime())) / 1000;
		}
		else if (/\d+H/.test(value)) {
			var days = parseInt(value.replace('H', ''), 10);
			end.setHours(beginning.getHours() + days);
			seconds += Math.abs((beginning.getTime() - end.getTime())) / 1000;
		}
		else if (/\d+M/.test(value) && hasFoundT) {
			var days = parseInt(value.replace('M', ''), 10);
			end.setMinutes(beginning.getMinutes() + days);
			seconds += Math.abs((beginning.getTime() - end.getTime())) / 1000;
		}
		else if (/\d+S/.test(value)) {
			seconds += parseInt(value.replace('S', ''), 10);
		}
		else if (/\d+[A-Z]/.test(value)) {
			throw new Error(Duration.Error.UnexpectedFormat);
		}
	}
	return seconds;
}

Duration.DurationFormat = {
	Extended : {
		pattern : /^P(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/,
		parser : Duration.Parser.Extended
	},
	Basic : {
		pattern : /^P(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/,
		parser : Duration.Parser.Basic
	},
	StandardWeeks : {
		pattern : /^P(\d+W)$/,
		parser : Duration.Parser.StandardWeeks
	},
	Standard : {
		pattern : /^P(\d+Y)*(\d+M)*(\d+D)*(?:(T)(\d+H)*(\d+M)*(\d+S)*)?$/,
		parser : Duration.Parser.Standard
	}
}

/*
Pad a value with leading zeros by specifying the desired length of the result string.
	Example: padInt(2, 4) will return '0002'
*/
Duration.padInt = function(value, length) {
	var valString = value + '';
	var result = '';
	
	var c = 0;
	for (var i = 0; i < length; i++) {
		if (length - i <= valString.length) {
			result += valString[c++];
		}
		else {
			result += '0';
		}
	}

	return result;
}

Duration.isValidDate = function(d) { 
	if (Object.prototype.toString.call(d) === "[object Date]") {
		if (isNaN(d.getTime())) {
			return false;
		}
		else {
			return true;
		}
	}
	else {
		return false;
	}
}

/* Cumulative getters */

Duration.prototype.inSeconds = function() {
	return this.seconds;
}

Duration.prototype.inMinutes = function() {
	return this.seconds / 60;
}

Duration.prototype.inHours = function() {
	return this.seconds / (60 * 60);
}

Duration.prototype.inDays = function() {
	return this.seconds / (60 * 60 * 24);
}

Duration.prototype.inWeeks = function() {
	return this.seconds / (60 * 60 * 24 * 7);
}

Duration.prototype.inMonths = function() {
	var d = new Date(this.seconds * 1000);
	var months = 0;
	while (d.getTime() < this._end.getTime()) {
		d.setMonth(d.getMonth() + 1);
		months++;
	}
	return months;
}

Duration.prototype.inYears = function() {
	var d = new Date(this.seconds * 1000);
	var years = 0;
	while (d.getTime() < this._end.getTime()) {
		d.setFullYear(d.getFullYear() + 1);
		years++;
	}
	return years;
}

/* Arithmetic */

Duration.prototype.add = function(other) {
	return new Duration(this.seconds + other.seconds);
}

Duration.prototype.subtract = function(other) {
	return new Duration(Math.abs(this.seconds - other.seconds));
}

/* Formatted getters */

/*
Returns an object that represents the full duration with integer values.
*/
Duration.prototype.value = function() {
	var result = {};
	var cursor = new Date(this._beginning);

	result.years = this._end.getFullYear() - cursor.getFullYear();
	cursor.setFullYear(cursor.getFullYear() + result.years);
	
	// result.months = Math.floor((this.seconds - (result.years * this.calendar.Seconds.per.Year)) / this.calendar.Seconds.per.Month);

	result.months = this._end.getMonth() - cursor.getMonth();
	cursor.setMonth(cursor.getMonth() + result.months);

	// result.days = Math.floor((this.seconds - (result.years * this.calendar.Seconds.per.Year)
	// 				- (result.months * this.calendar.Seconds.per.Month)) / this.calendar.Seconds.per.Day);

	result.days = this._end.getDate() - cursor.getDate();
	cursor.setDate(cursor.getDate() + result.days);

	// result.hours = Math.floor((this.seconds - (result.years * this.calendar.Seconds.per.Year)
	// 				- (result.months * this.calendar.Seconds.per.Month)
	// 				- (result.days * this.calendar.Seconds.per.Day)) / this.calendar.Seconds.per.Hour);

	result.hours = this._end.getHours() - cursor.getHours();
	cursor.setHours(cursor.getHours() + result.hours);

	// result.minutes = Math.floor((this.seconds - (result.years * this.calendar.Seconds.per.Year)
	// 				- (result.months * this.calendar.Seconds.per.Month)
	// 				- (result.days * this.calendar.Seconds.per.Day)
	// 				- (result.hours * this.calendar.Seconds.per.Hour)) / this.calendar.Seconds.per.Minute);

	result.minutes = this._end.getMinutes() - cursor.getMinutes();
	cursor.setMinutes(cursor.getMinutes() + result.minutes);

	// result.seconds = Math.round((this.seconds - (result.years * this.calendar.Seconds.per.Year)
	// 				- (result.months * this.calendar.Seconds.per.Month)
	// 				- (result.days * this.calendar.Seconds.per.Day)
	// 				- (result.hours * this.calendar.Seconds.per.Hour)
	// 				- (result.minutes * this.calendar.Seconds.per.Minute)));

	result.seconds = this._end.getSeconds() - cursor.getSeconds();
	cursor.setSeconds(cursor.getSeconds() + result.seconds);

	return result;
}

Duration.prototype.ago = function() {
	if (this.seconds == 0) {
		return 'just now';
	}
	else if (this.inSeconds() < 60) {
		return this.seconds + ' second' + ((this.seconds > 1) ? 's' : '') + ' ago';
	}
	else if (this.inMinutes() < 60) {
		return Math.floor(this.inMinutes()) + ' minute' + ((this.inMinutes() > 1) ? 's' : '') + ' ago';
	}
	else if (this.inHours() < 24) {
		return Math.floor(this.inHours()) + ' hour' + ((this.inHours() > 1) ? 's' : '') + ' ago';
	}
	else if (this.inDays() < 7) {
		return Math.floor(this.inDays()) + ' day' + ((this.inDays() > 1) ? 's' : '') + ' ago';
	}
	else if (this.inDays() < 31) {
		return Math.floor(this.inWeeks()) + ' week' + ((this.inWeeks() > 1) ? 's' : '') + ' ago';
	}
	else if (this.inMonths() < 12) {
		return Math.floor(this.inMonths()) + ' month' + ((this.inMonths() > 1) ? 's' : '') + ' ago';
	}
	else {
		return Math.floor(this.inYears()) + ' year' + ((this.inYears() > 1) ? 's' : '') + ' ago';
	}
}

Duration.prototype.asClock = function() {
	var duration = this.value();
	if (duration.hours == 0) {
		return duration.minutes + ':'
			+ ((duration.seconds < 10) ? '0' + duration.seconds : duration.seconds);
	}
	else {
		return duration.hours + ':'
			+ ((duration.minutes < 10) ? '0' + duration.minutes : duration.minutes) + ':'
			+ ((duration.seconds < 10) ? '0' + duration.seconds : duration.seconds);
	}
}

Duration.prototype.asStandard = function() {
	var duration = this.value();
	if (this.seconds == 0) {
		return 'PT0S';
	}

	var shouldHaveT = duration.hours > 0 || duration.minutes > 0 || duration.seconds > 0;

	return 'P' + ((duration.years > 0) ? duration.years + 'Y' : '')
			+ ((duration.months > 0) ? duration.months + 'M' : '')
			+ ((duration.days > 0) ? duration.days + 'D' : '')
			+ ((shouldHaveT) ? 'T' : '')
			+ ((duration.hours > 0) ? duration.hours + 'H' : '')
			+ ((duration.minutes > 0) ? duration.minutes + 'M' : '')
			+ ((duration.seconds > 0) ? duration.seconds + 'S' : '');
}

Duration.prototype.asStandardWeeks = function() {
	return 'P' + Math.floor(this.inWeeks()) + 'W';
}

Duration.prototype.asExtended = function() {
	var duration = this.value();
	return 'P' + Duration.padInt(duration.years, 4) + '-'
			+ Duration.padInt(duration.months, 2) + '-'
			+ Duration.padInt(duration.days, 2) + 'T'
			+ Duration.padInt(duration.hours, 2) + ':'
			+ Duration.padInt(duration.minutes, 2) + ':'
			+ Duration.padInt(duration.seconds, 2);
}

Duration.prototype.asBasic = function() {
	var duration = this.value();
	return 'P' + Duration.padInt(duration.years, 4)
			+ Duration.padInt(duration.months, 2)
			+ Duration.padInt(duration.days, 2) + 'T'
			+ Duration.padInt(duration.hours, 2)
			+ Duration.padInt(duration.minutes, 2)
			+ Duration.padInt(duration.seconds, 2);
}

window['Duration'] = Duration;
