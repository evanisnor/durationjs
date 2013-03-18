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

var Duration = function(representation) {
	var self = this;

	/* Fields */

	self.seconds = 0;

	/* Error Messages */

	self.UNEXPECTED_FORMAT_ERROR = "Unexpected duration format. Refer to ISO 8601.";
	self.NEGATIVE_VALUE_ERROR = "Cannot create a negative duration.";
	self.OVERFLOW_ERROR = "Cannot represent a duration that large. Float overflow.";

	/* Parsing */

	self.SUPPORTED_FORMAT = {
		MODULI_DELIMITED : /^P(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/,
		MODULI_NONDELIMITED : /^P(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/,
		NO_MODULI_WEEKS : /^P(\d+W)$/,
		NO_MODULI : /^P(\d+Y)*(\d+M)*(\d+D)*(?:(T)(\d+H)*(\d+M)*(\d+S)*)?$/
	};

	self.parse = function(pattern, match) {
		if (pattern === self.SUPPORTED_FORMAT.NO_MODULI_WEEKS) {
			for (var i = 1; i < match.length; i++) {
				var value = match[i];
				if (/\d+W/.test(value)) {
					self.seconds += parseInt(value.replace('W', '')) * Calendar.Seconds.per.Week;
				}
				else if (/\d+[A-Z]/.test(value)) {
					console.log("duration.js: Error: UNEXPECTED_FORMAT_ERROR");
					throw new Error(self.UNEXPECTED_FORMAT_ERROR);
				}
			}
		}
		else if (pattern === self.SUPPORTED_FORMAT.NO_MODULI) {
			if (match[0] === 'P' || match[0] === 'PT') {
				console.log("duration.js: Error: UNEXPECTED_FORMAT_ERROR");
				throw new Error(self.UNEXPECTED_FORMAT_ERROR);
			}
			
			var hasFoundT = false;
			for (var groupIndex = 1; groupIndex < match.length; groupIndex++) {
				var value = match[groupIndex];
				if (/T/.test(value)) {
					hasFoundT = true;
				}
				else if (/\d+Y/.test(value)) {
					self.seconds += parseInt(value.replace('Y', '')) * Calendar.Seconds.per.Year;
				}
				else if (/\d+M/.test(value) && !hasFoundT) {
					self.seconds += parseInt(value.replace('M', '')) * Calendar.Seconds.per.Month;
				}
				else if (/\d+D/.test(value)) {
					self.seconds += parseInt(value.replace('D', '')) * Calendar.Seconds.per.Day;
				}
				else if (/\d+H/.test(value)) {
					self.seconds += parseInt(value.replace('H', '')) * Calendar.Seconds.per.Hour;
				}
				else if (/\d+M/.test(value) && hasFoundT) {
					self.seconds += parseInt(value.replace('M', '')) * Calendar.Seconds.per.Minute;
				}
				else if (/\d+S/.test(value)) {
					self.seconds += parseInt(value.replace('S', ''));
				}
				else if (/\d+[A-Z]/.test(value)) {
					console.log("duration.js: Error: UNEXPECTED_FORMAT_ERROR");
					throw new Error(self.UNEXPECTED_FORMAT_ERROR);
				}
			}
		}
		else if (pattern === self.SUPPORTED_FORMAT.MODULI_DELIMITED
			|| pattern === self.SUPPORTED_FORMAT.MODULI_NONDELIMITED) {
			
			for (var groupIndex = 1; groupIndex < match.length; groupIndex++) {
				var value = parseInt(match[groupIndex]);
				if (groupIndex === 1) {
					self.seconds += value * Calendar.Seconds.per.Year;
				}
				else if (groupIndex === 2) {
					if (value > 12) {
						console.log("duration.js: Error: UNEXPECTED_FORMAT_ERROR");
						throw new Error(self.UNEXPECTED_FORMAT_ERROR);
					}
					self.seconds += value * Calendar.Seconds.per.Month;
				}
				else if (groupIndex === 3) {
					if (value > 31) {
						console.log("duration.js: Error: UNEXPECTED_FORMAT_ERROR");
						throw new Error(self.UNEXPECTED_FORMAT_ERROR);
					}
					self.seconds += value * Calendar.Seconds.per.Day;
				}
				else if (groupIndex === 4) {
					if (value > 24) {
						console.log("duration.js: Error: UNEXPECTED_FORMAT_ERROR");
						throw new Error(self.UNEXPECTED_FORMAT_ERROR);
					}
					self.seconds += value * Calendar.Seconds.per.Hour;
				}
				else if (groupIndex === 5) {
					if (value > 60) {
						console.log("duration.js: Error: UNEXPECTED_FORMAT_ERROR");
						throw new Error(self.UNEXPECTED_FORMAT_ERROR);
					}
					self.seconds += value * Calendar.Seconds.per.Minute;
				}
				else if (groupIndex === 6) {
					if (value > 60) {
						console.log("duration.js: Error: UNEXPECTED_FORMAT_ERROR");
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
		console.log("duration.js: Error: NEGATIVE_VALUE_ERROR");
		throw new Error(self.NEGATIVE_VALUE_ERROR);
	}
	else if (typeof representation === 'number') {
		self.seconds = representation;
	}
	else {
		var isSupportedFormat = false;
		for (var format in self.SUPPORTED_FORMAT) {
			if (self.SUPPORTED_FORMAT.hasOwnProperty(format)) {
				var pattern = self.SUPPORTED_FORMAT[format];
				if (pattern.test(representation)) {
					isSupportedFormat = true;
					// console.log(format + ": " + representation);
					self.parse(pattern, representation.match(pattern));
					break;
				}
			}
		}

		if (!isSupportedFormat) {
			console.log("duration.js: Error: UNEXPECTED_FORMAT_ERROR");
			throw new Error(self.UNEXPECTED_FORMAT_ERROR);
		}
	}

	if (self.seconds == NaN) {
		console.log("duration.js: Error: OVERFLOW_ERROR");
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

	self.remaining = function() {
		var hours = Math.floor(self.seconds / 3600) % 24;
		var minutes = Math.floor(self.seconds / 60) % 60;
		var seconds = self.seconds % 60;

		if (hours == 0) {
			return minutes + ':' + ((seconds < 10) ? '0' + seconds : seconds);
		}
		else {
			return hours + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
		}
	}

	self.formatNoModuli = function() {
		return '';
	}

	self.formatNoModuliWeeks = function() {
		return '';
	}

	self.formatModuliDelimited = function() {
		return '';
	}

	self.formatModuliNonDelimited = function() {
		return '';
	}
}