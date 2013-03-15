'use strict';

var Duration = function(representation) {
	var self = this;
	
	/* Fields */

	self.seconds = 0;

	/* Constants */

	self.SECONDS_IN_A_MINUTE = 60;
	self.SECONDS_IN_AN_HOUR = self.SECONDS_IN_A_MINUTE * 60;
	self.SECONDS_IN_A_DAY = self.SECONDS_IN_AN_HOUR * 24;
	self.SECONDS_IN_A_WEEK = self.SECONDS_IN_A_DAY * 7;
	self.SECONDS_IN_A_MONTH = self.SECONDS_IN_A_WEEK * 4;
	self.SECONDS_IN_A_YEAR = self.SECONDS_IN_A_DAY * 365;

	self.UNEXPECTED_FORMAT_ERROR = "Unexpected duration format. Refer to ISO 8601.";
	self.UNEXPECTED_FLOAT_ERROR = "Unexpected duration format. Try passing in an Integer or an ISO 8601 Duration string instead.";
	self.NEGATIVE_VALUE_ERROR = "Cannot create a negative Duration.";

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
					self.seconds += parseInt(value.replace('W', '')) * self.SECONDS_IN_A_WEEK;
				}
				else if (/\d+[A-Z]/.test(value)) {
					console.log("Duration.js: Error: UNEXPECTED_FORMAT_ERROR");
					throw new Error(self.UNEXPECTED_FORMAT_ERROR);
				}
			}
		}
		else if (pattern === self.SUPPORTED_FORMAT.NO_MODULI) {
			if (match[0] === 'P' || match[0] === 'PT') {
				console.log("Duration.js: Error: UNEXPECTED_FORMAT_ERROR");
				throw new Error(self.UNEXPECTED_FORMAT_ERROR);
			}
			
			var hasFoundT = false;
			for (var groupIndex = 1; groupIndex < match.length; groupIndex++) {
				var value = match[groupIndex];
				if (/T/.test(value)) {
					hasFoundT = true;
				}
				else if (/\d+Y/.test(value)) {
					self.seconds += parseInt(value.replace('Y', '')) * self.SECONDS_IN_A_YEAR;
				}
				else if (/\d+M/.test(value) && !hasFoundT) {
					self.seconds += parseInt(value.replace('M', '')) * self.SECONDS_IN_A_MONTH;
				}
				else if (/\d+D/.test(value)) {
					self.seconds += parseInt(value.replace('D', '')) * self.SECONDS_IN_A_DAY;
				}
				else if (/\d+H/.test(value)) {
					self.seconds += parseInt(value.replace('H', '')) * self.SECONDS_IN_AN_HOUR;
				}
				else if (/\d+M/.test(value) && hasFoundT) {
					self.seconds += parseInt(value.replace('M', '')) * self.SECONDS_IN_A_MINUTE;
				}
				else if (/\d+S/.test(value)) {
					self.seconds += parseInt(value.replace('S', ''));
				}
				else if (/\d+[A-Z]/.test(value)) {
					console.log("Duration.js: Error: UNEXPECTED_FORMAT_ERROR");
					throw new Error(self.UNEXPECTED_FORMAT_ERROR);
				}
			}
		}
		else if (pattern === self.SUPPORTED_FORMAT.MODULI_DELIMITED
			|| pattern === self.SUPPORTED_FORMAT.MODULI_NONDELIMITED) {
			
			for (var groupIndex = 1; groupIndex < match.length; groupIndex++) {
				var value = parseInt(match[groupIndex]);
				if (groupIndex === 1) {
					self.seconds += value * self.SECONDS_IN_A_YEAR;
				}
				else if (groupIndex === 2) {
					if (value > 12) {
						console.log("Duration.js: Error: UNEXPECTED_FORMAT_ERROR");
						throw new Error(self.UNEXPECTED_FORMAT_ERROR);
					}
					self.seconds += value * self.SECONDS_IN_A_MONTH;
				}
				else if (groupIndex === 3) {
					if (value > 31) {
						console.log("Duration.js: Error: UNEXPECTED_FORMAT_ERROR");
						throw new Error(self.UNEXPECTED_FORMAT_ERROR);
					}
					self.seconds += value * self.SECONDS_IN_A_DAY;
				}
				else if (groupIndex === 4) {
					if (value > 24) {
						console.log("Duration.js: Error: UNEXPECTED_FORMAT_ERROR");
						throw new Error(self.UNEXPECTED_FORMAT_ERROR);
					}
					self.seconds += value * self.SECONDS_IN_AN_HOUR;
				}
				else if (groupIndex === 5) {
					if (value > 60) {
						console.log("Duration.js: Error: UNEXPECTED_FORMAT_ERROR");
						throw new Error(self.UNEXPECTED_FORMAT_ERROR);
					}
					self.seconds += value * self.SECONDS_IN_A_MINUTE;
				}
				else if (groupIndex === 6) {
					if (value > 60) {
						console.log("Duration.js: Error: UNEXPECTED_FORMAT_ERROR");
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
	
	if (typeof representation === 'number' && representation % 1 != 0) {
		console.log("Duration.js: Error: UNEXPECTED_FLOAT_ERROR");
		throw new Error(self.UNEXPECTED_FLOAT_ERROR);
	}
	else if (typeof representation === 'number' && representation < 0) {
		console.log("Duration.js: Error: NEGATIVE_VALUE_ERROR");
		throw new Error(self.NEGATIVE_VALUE_ERROR);
	}
	else if (typeof representation === 'number' && representation % 1 == 0) {
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
			console.log("Duration.js: Error: UNEXPECTED_FORMAT_ERROR");
			throw new Error(self.UNEXPECTED_FORMAT_ERROR);
		}
	}

	/* Cumulative getters */

	self.inSeconds = function() {
		return self.seconds;
	}

	self.inMinutes = function() {
		return self.seconds / self.SECONDS_IN_A_MINUTE;
	}

	self.inHours = function() {
		return self.seconds / self.SECONDS_IN_AN_HOUR;
	}

	self.inDays = function() {
		return self.seconds / self.SECONDS_IN_A_DAY;
	}

	self.inWeeks = function() {
		return self.seconds / self.SECONDS_IN_A_WEEK;
	}

	self.inMonths = function() {
		return self.seconds / self.SECONDS_IN_A_MONTH;
	}

	self.inYears = function() {
		return self.seconds / self.SECONDS_IN_A_YEAR;
	}

	/* Arithmetic */

	self.add = function(other) {
		// console.log("Add: " + self.seconds + " + " + other.seconds);
		return new Duration(self.seconds + other.seconds);
	}

	self.subtract = function(other) {
		// console.log("Subtract: " + self.seconds + " - " + other.seconds);
		return new Duration(self.seconds - other.seconds);
	}

	/* Formatted getters */

	self.ago = function() {
	}

	self.remaining = function() {
	}

	self.inFormat = function(format) {
	}
}