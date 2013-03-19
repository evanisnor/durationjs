'use strict';
/*
duration.js
A JavaScript library for parsing and manipulating ISO 8601 formatted duration strings.

Licensed under The MIT License (MIT)
*/

var Calendar = {
	Seconds : {
		per : {
			Minute : 60,
			Hour : 60 * 60,
			Day : 60 * 60 * 24,
			Week : 60 * 60 * 24 * 7,
			Month : 60 * 60 * 24 * 30.4368,
			Year : 60 * 60 * 24 * 365.242
		}
	},
	Minutes : {
		per : {
			Hour : 60,
			Day : 60 * 24,
			Week : 60 * 24 * 7,
			Month : 60 * 24 * 30.4368,
			Year : 60 * 24 * 365.242
		}
	},
	Hours : {
		per : {
			Day : 24,
			Week : 24 * 7,
			Month : 24 * 30.4368,
			Year : 24 * 365.242
		}
	},
	Days : {
		per : {
			Week : 7,
			Month : 30.4368,
			Year : 365.242
		}
	},
	Weeks : {
		per : { 
			Month : 4.34812,
			Year : 52.1775
		}
	},
	Months : {
		per : {
			Year : 12
		}
	}
};

/*
Use this instead of parseInt() for parsing integers from strings. This prevents Firefox
from interpreting '00x' as octal x.
*/
var parseIntBase10 = function(string) {
	if (/^[0]*$/.test(string)) {
		return 0;
	}

	var match = string.match(/^0*(\d*)$/);
	if (match.length < 2) {
		throw new Error(self.UNEXPECTED_FORMAT_ERROR);
	}
	return parseInt(match[1]);
}

/*
Pad a value with leading zeros by specifying the desired length of the result string.
	Example: padInt(2, 4) will return '0002'
*/
var padInt = function(value, length) {
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

var Duration = function(representation) {
	var self = this;

	/* Fields */

	self.seconds = 0;

	/* Error Messages */

	self.UNEXPECTED_FORMAT_ERROR = "Unexpected duration format. Refer to ISO 8601.";
	self.NEGATIVE_VALUE_ERROR = "Cannot create a negative duration.";
	self.OVERFLOW_ERROR = "Cannot represent a duration that large. Float overflow.";

	/* Parsing */

	self.DurationFormat = {
		Extended : /^P(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/,
		Basic : /^P(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/,
		StandardWeeks : /^P(\d+W)$/,
		Standard : /^P(\d+Y)*(\d+M)*(\d+D)*(?:(T)(\d+H)*(\d+M)*(\d+S)*)?$/
	};

	self.parse = function(pattern, match) {
		if (pattern === self.DurationFormat.StandardWeeks) {
			for (var i = 1; i < match.length; i++) {
				var value = match[i];
				if (/\d+W/.test(value)) {
					self.seconds += parseIntBase10(value.replace('W', '')) * Calendar.Seconds.per.Week;
				}
				else if (/\d+[A-Z]/.test(value)) {
					throw new Error(self.UNEXPECTED_FORMAT_ERROR);
				}
			}
		}
		else if (pattern === self.DurationFormat.Standard) {
			if (match[0] === 'P' || match[0] === 'PT') {
				throw new Error(self.UNEXPECTED_FORMAT_ERROR);
			}
			
			var hasFoundT = false;
			for (var groupIndex = 1; groupIndex < match.length; groupIndex++) {
				var value = match[groupIndex];
				if (/T/.test(value)) {
					hasFoundT = true;
				}
				else if (/\d+Y/.test(value)) {
					self.seconds += parseIntBase10(value.replace('Y', '')) * Calendar.Seconds.per.Year;
				}
				else if (/\d+M/.test(value) && !hasFoundT) {
					self.seconds += parseIntBase10(value.replace('M', '')) * Calendar.Seconds.per.Month;
				}
				else if (/\d+D/.test(value)) {
					self.seconds += parseIntBase10(value.replace('D', '')) * Calendar.Seconds.per.Day;
				}
				else if (/\d+H/.test(value)) {
					self.seconds += parseIntBase10(value.replace('H', '')) * Calendar.Seconds.per.Hour;
				}
				else if (/\d+M/.test(value) && hasFoundT) {
					self.seconds += parseIntBase10(value.replace('M', '')) * Calendar.Seconds.per.Minute;
				}
				else if (/\d+S/.test(value)) {
					self.seconds += parseIntBase10(value.replace('S', ''));
				}
				else if (/\d+[A-Z]/.test(value)) {
					throw new Error(self.UNEXPECTED_FORMAT_ERROR);
				}
			}
		}
		else if (pattern === self.DurationFormat.Extended
			|| pattern === self.DurationFormat.Basic) {
			
			for (var groupIndex = 1; groupIndex < match.length; groupIndex++) {
				var value = parseIntBase10(match[groupIndex]);
				if (groupIndex === 1) {
					self.seconds += value * Calendar.Seconds.per.Year;
				}
				else if (groupIndex === 2) {
					if (value >= 12) {
						throw new Error(self.UNEXPECTED_FORMAT_ERROR);
					}
					self.seconds += value * Calendar.Seconds.per.Month;
				}
				else if (groupIndex === 3) {
					if (value > 31) {
						throw new Error(self.UNEXPECTED_FORMAT_ERROR);
					}
					self.seconds += value * Calendar.Seconds.per.Day;
				}
				else if (groupIndex === 4) {
					if (value >= 24) {
						throw new Error(self.UNEXPECTED_FORMAT_ERROR);
					}
					self.seconds += value * Calendar.Seconds.per.Hour;
				}
				else if (groupIndex === 5) {
					if (value >= 60) {
						throw new Error(self.UNEXPECTED_FORMAT_ERROR);
					}
					self.seconds += value * Calendar.Seconds.per.Minute;
				}
				else if (groupIndex === 6) {
					if (value >= 60) {
						throw new Error(self.UNEXPECTED_FORMAT_ERROR);
					}
					self.seconds += value;
				}
			}
		}
	}

	/* Constructor */

	if (representation == 'undefined' || representation == undefined || representation == '') {
		representation = 0;
	}
	
	if (typeof representation === 'number' && representation < 0) {
		throw new Error(self.NEGATIVE_VALUE_ERROR);
	}
	else if (typeof representation === 'number') {
		self.seconds = representation;
	}
	else {
		var isSupportedFormat = false;
		for (var format in self.DurationFormat) {
			if (self.DurationFormat.hasOwnProperty(format)) {
				var pattern = self.DurationFormat[format];
				if (pattern.test(representation)) {
					isSupportedFormat = true;
					self.parse(pattern, representation.match(pattern));
					break;
				}
			}
		}

		if (!isSupportedFormat) {
			throw new Error(self.UNEXPECTED_FORMAT_ERROR);
		}
	}

	if (self.seconds == NaN) {
		throw new Error(self.OVERFLOW_ERROR);

	}

	/* Cumulative getters */

	self.inSeconds = function() {
		return self.seconds;
	}

	self.inMinutes = function() {
		return self.seconds / Calendar.Seconds.per.Minute;
	}

	self.inHours = function() {
		return self.seconds / Calendar.Seconds.per.Hour;
	}

	self.inDays = function() {
		return self.seconds / Calendar.Seconds.per.Day;
	}

	self.inWeeks = function() {
		return self.seconds / Calendar.Seconds.per.Week;
	}

	self.inMonths = function() {
		return self.seconds / Calendar.Seconds.per.Month;
	}

	self.inYears = function() {
		return self.seconds / Calendar.Seconds.per.Year;
	}

	/* Arithmetic */

	self.add = function(other) {
		return new Duration(self.seconds + other.seconds);
	}

	self.subtract = function(other) {
		return new Duration(self.seconds - other.seconds);
	}

	/* Formatted getters */

	/*
	Returns an object that represents the full duration with integer values.
	*/
	self.value = function() {
		var result = {};
		result.years = Math.floor(self.seconds / Calendar.Seconds.per.Year);
		result.months = Math.floor((self.seconds - (result.years * Calendar.Seconds.per.Year)) / Calendar.Seconds.per.Month);
		result.days = Math.floor((self.seconds - (result.years * Calendar.Seconds.per.Year)
						- (result.months * Calendar.Seconds.per.Month)) / Calendar.Seconds.per.Day);
		result.hours = Math.floor((self.seconds - (result.years * Calendar.Seconds.per.Year)
						- (result.months * Calendar.Seconds.per.Month)
						- (result.days * Calendar.Seconds.per.Day)) / Calendar.Seconds.per.Hour);
		result.minutes = Math.floor((self.seconds - (result.years * Calendar.Seconds.per.Year)
						- (result.months * Calendar.Seconds.per.Month)
						- (result.days * Calendar.Seconds.per.Day)
						- (result.hours * Calendar.Seconds.per.Hour)) / Calendar.Seconds.per.Minute);
		result.seconds = Math.round((self.seconds - (result.years * Calendar.Seconds.per.Year)
						- (result.months * Calendar.Seconds.per.Month)
						- (result.days * Calendar.Seconds.per.Day)
						- (result.hours * Calendar.Seconds.per.Hour)
						- (result.minutes * Calendar.Seconds.per.Minute)));
		return result;
	}

	self.ago = function() {
		if (self.seconds == 0) {
			return 'just now';
		}
		else if (self.seconds < Calendar.Seconds.per.Minute) {
			return self.seconds + ' second' + ((self.seconds > 1) ? 's' : '') + ' ago';
		}
		else if (self.seconds < Calendar.Seconds.per.Hour) {
			return Math.floor(self.inMinutes()) + ' minute' + ((self.inMinutes() > 1) ? 's' : '') + ' ago';
		}
		else if (self.seconds < Calendar.Seconds.per.Day) {
			return Math.floor(self.inHours()) + ' hour' + ((self.inHours() > 1) ? 's' : '') + ' ago';
		}
		else if (self.seconds < Calendar.Seconds.per.Week) {
			return Math.floor(self.inDays()) + ' day' + ((self.inDays() > 1) ? 's' : '') + ' ago';
		}
		else if (self.seconds < Calendar.Seconds.per.Month) {
			return Math.floor(self.inWeeks()) + ' week' + ((self.inWeeks() > 1) ? 's' : '') + ' ago';
		}
		else if (self.seconds < Calendar.Seconds.per.Year) {
			return Math.floor(self.inMonths()) + ' month' + ((self.inMonths() > 1) ? 's' : '') + ' ago';
		}
		else {
			return Math.floor(self.inYears()) + ' year' + ((self.inYears() > 1) ? 's' : '') + ' ago';
		}
	}

	self.asClock = function() {
		var duration = self.value();
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

	self.asStandard = function() {
		var duration = self.value();
		if (self.seconds == 0) {
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

	self.asStandardWeeks = function() {
		return 'P' + Math.floor(self.inWeeks()) + 'W';
	}

	self.asExtended = function() {
		var duration = self.value();
		return 'P' + padInt(duration.years, 4) + '-'
				+ padInt(duration.months, 2) + '-'
				+ padInt(duration.days, 2) + 'T'
				+ padInt(duration.hours, 2) + ':'
				+ padInt(duration.minutes, 2) + ':'
				+ padInt(duration.seconds, 2);
	}

	self.asBasic = function() {
		var duration = self.value();
		return 'P' + padInt(duration.years, 4)
				+ padInt(duration.months, 2)
				+ padInt(duration.days, 2) + 'T'
				+ padInt(duration.hours, 2)
				+ padInt(duration.minutes, 2)
				+ padInt(duration.seconds, 2);
	}
}