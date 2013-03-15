'use strict';

describe('Duration Test Suite', function() {

	beforeEach(function() {

	});

	afterEach(function() {

	});

	describe('Duration Parsing Tests', function() {
		
		beforeEach(function() {

		});

		afterEach(function() {

		});
		
		it("should initialize at 0 seconds without parameters", function() {
			var duration = new Duration();
			expect(duration.seconds).toBe(0);
		});

		it("should parse integers as seconds", function() {
			for (var s = 0; s < 1245; s++) {
				expect((new Duration(s)).seconds).toBe(s);
			}
		});
		
		it("should parse P#Y#M#DT#H#M#S format", function() {
			expect((new Duration("P1Y1M1DT1H1M1S")).seconds).toBe(
				(60 * 60 * 24 * 365) // Year
				+ (60 * 60 * 24 * 7 * 4) // Month
				+ (60 * 60 * 24) // Day
				+ (60 * 60) // Hour
				+ (60) // Minute
				+ 1); // 1 Second

			expect((new Duration("P10Y10M10DT10H10M10S")).seconds).toBe(
				(60 * 60 * 24 * 365 * 10) // 10 Years
				+ (60 * 60 * 24 * 7 * 4 * 10) // 10 Months
				+ (60 * 60 * 24 * 10) // 10 Days
				+ (60 * 60 * 10) // 10 Hours
				+ (60 * 10) // 10 Minutes
				+ 10); // 10 Seconds

			expect((new Duration("P2Y2M2DT2H2M")).seconds).toBe(
				(60 * 60 * 24 * 365 * 2) // 10 Years
				+ (60 * 60 * 24 * 7 * 4 * 2) // 10 Months
				+ (60 * 60 * 24 * 2) // 10 Days
				+ (60 * 60 * 2) // 10 Hours
				+ (60 * 2)); // 10 Minutes

			expect((new Duration("P2Y2M2DT2H2M")).seconds).toBe(
				(60 * 60 * 24 * 365 * 2) // 2 Years
				+ (60 * 60 * 24 * 7 * 4 * 2) // 2 Months
				+ (60 * 60 * 24 * 2) // 2 Days
				+ (60 * 60 * 2) // 2 Hours
				+ (60 * 2)); // 2 Minutes

			expect((new Duration("P3Y3M3DT3H")).seconds).toBe(
				(60 * 60 * 24 * 365 * 3) // 3 Years
				+ (60 * 60 * 24 * 7 * 4 * 3) // 3 Months
				+ (60 * 60 * 24 * 3) // 3 Days
				+ (60 * 60 * 3)); // 3 Hours

			expect((new Duration("P4Y4M4D")).seconds).toBe(
				(60 * 60 * 24 * 365 * 4) // 4 Years
				+ (60 * 60 * 24 * 7 * 4 * 4) // 4 Months
				+ (60 * 60 * 24 * 4)); // 4 Days

			expect((new Duration("P5Y5M")).seconds).toBe(
				(60 * 60 * 24 * 365 * 5) // 5 Years
				+ (60 * 60 * 24 * 7 * 4 * 5)); // 5 Months

			expect((new Duration("P6Y")).seconds).toBe(
				(60 * 60 * 24 * 365 * 6)); // 6 Years

			expect((new Duration("P11M11DT11H11M11S")).seconds).toBe(
				(60 * 60 * 24 * 7 * 4 * 11) // 11 Months
				+ (60 * 60 * 24 * 11) // 11 Days
				+ (60 * 60 * 11) // 11 Hours
				+ (60 * 11) // 11 Minutes
				+ 11); // 11 Seconds

			expect((new Duration("P12DT12H12M12S")).seconds).toBe(
				(60 * 60 * 24 * 12) // 12 Days
				+ (60 * 60 * 12) // 12 Hours
				+ (60 * 12) // 12 Minutes
				+ 12); // 12 Seconds

			expect((new Duration("PT13H13M13S")).seconds).toBe(
				(60 * 60 * 13) // 13 Hours
				+ (60 * 13) // 13 Minutes
				+ 13); // 13 Seconds

			expect((new Duration("PT14M14S")).seconds).toBe(
				(60 * 14) // 14 Minutes
				+ 14); // 14 Seconds

			expect((new Duration("PT15S")).seconds).toBe(
				15); // 15 Seconds

			expect((new Duration("PT61S")).seconds).toBe(
				61); // 61 Seconds

			expect((new Duration("PT61M61S")).seconds).toBe(
				(60 * 61) // 61 Minutes
				+ 61); // 61 Seconds

			expect((new Duration("PT25H61M61S")).seconds).toBe(
				(60 * 60 * 25) // 25 Hours
				+ (60 * 61) // 61 Minutes
				+ 61); // 61 Seconds

			expect((new Duration("P400DT25H61M61S")).seconds).toBe(
				(60 * 60 * 24 * 400) // 400 Days
				+ (60 * 60 * 25) // 25 Hours
				+ (60 * 61) // 61 Minutes
				+ 61); // 61 Seconds

			expect((new Duration("P13M400DT25H61M61S")).seconds).toBe(
				(60 * 60 * 24 * 7 * 4 * 13) // 13 Months
				+ (60 * 60 * 24 * 400) // 400 Days
				+ (60 * 60 * 25) // 25 Hours
				+ (60 * 61) // 61 Minutes
				+ 61); // 61 Seconds

			expect((new Duration("P271Y13M400DT25H61M61S")).seconds).toBe(
				(60 * 60 * 24 * 365 * 271) // 271 Years
				+ (60 * 60 * 24 * 7 * 4 * 13) // 13 Months
				+ (60 * 60 * 24 * 400) // 400 Days
				+ (60 * 60 * 25) // 25 Hours
				+ (60 * 61) // 61 Minutes
				+ 61); // 61 Seconds

			expect((new Duration("P45Y8M2DT574H7021M4S")).seconds).toBe(
				(60 * 60 * 24 * 365 * 45) // 45 Years
				+ (60 * 60 * 24 * 7 * 4 * 8) // 8 Months
				+ (60 * 60 * 24 * 2) // 2 Days
				+ (60 * 60 * 574) // 574 Hours
				+ (60 * 7021) // 7021 Minutes
				+ 4); // 4 Seconds
		});

		it("should parse P#W format", function() {
			expect((new Duration("P1W")).seconds).toBe(
				+ (60 * 60 * 24 * 7 * 1)); // 1 Week

			expect((new Duration("P2W")).seconds).toBe(
				+ (60 * 60 * 24 * 7 * 2)); // 2 Weeks

			expect((new Duration("P5W")).seconds).toBe(
				+ (60 * 60 * 24 * 7 * 5)); // 5 Weeks

			expect((new Duration("P20W")).seconds).toBe(
				+ (60 * 60 * 24 * 7 * 20)); // 20 Weeks

			expect((new Duration("P53W")).seconds).toBe(
				+ (60 * 60 * 24 * 7 * 53)); // 53 Weeks

			expect((new Duration("P243W")).seconds).toBe(
				+ (60 * 60 * 24 * 7 * 243)); // 243 Weeks
		});

		it("should parse P[YYYY][MM][DD]T[hh][mm][ss] format", function() {
			expect((new Duration("P00010101T010101")).seconds).toBe(
				(60 * 60 * 24 * 365 * 1) // 1 Year
				+ (60 * 60 * 24 * 7 * 4 * 1) // 1 Month
				+ (60 * 60 * 24 * 1) // 1 Day
				+ (60 * 60 * 1) // 1 Hour
				+ (60 * 1) // 1 Minute
				+ 1); // 1 Second

			expect((new Duration("P00241202T100447")).seconds).toBe(
				(60 * 60 * 24 * 365 * 24) // 24 Years
				+ (60 * 60 * 24 * 7 * 4 * 12) // 12 Months
				+ (60 * 60 * 24 * 2) // 2 Days
				+ (60 * 60 * 10) // 10 Hours
				+ (60 * 4) // 4 Minutes
				+ 47); // 47 Seconds
		});

		it("should parse P[YYYY]-[MM]-[DD]T[hh]:[mm]:[ss] format", function() {
			expect((new Duration("P0001-01-01T01:01:01")).seconds).toBe(
				(60 * 60 * 24 * 365 * 1) // 1 Year
				+ (60 * 60 * 24 * 7 * 4 * 1) // 1 Month
				+ (60 * 60 * 24 * 1) // 1 Day
				+ (60 * 60 * 1) // 1 Hour
				+ (60 * 1) // 1 Minute
				+ 1); // 1 Second

			expect((new Duration("P0024-12-02T10:04:47")).seconds).toBe(
				(60 * 60 * 24 * 365 * 24) // 24 Years
				+ (60 * 60 * 24 * 7 * 4 * 12) // 12 Months
				+ (60 * 60 * 24 * 2) // 2 Days
				+ (60 * 60 * 10) // 10 Hours
				+ (60 * 4) // 4 Minutes
				+ 47); // 47 Seconds
		});

		it ("should fail to parse improperly formatted duration strings", function() {
			expect(function() {
				new Duration("this is garbage data lol");
			}).toThrow(Duration.UNEXPECTED_FORMAT_ERROR);
			
			expect(function() {
				new Duration("*(^#$JDJ34h fw5ad..6fjw#D 343");
			}).toThrow(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(function() {
				new Duration("P20S");
			}).toThrow(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(function() {
				new Duration("P3Y6W");
			}).toThrow(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(function() {
				new Duration("P3Y6S");
			}).toThrow(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(function() {
				new Duration("P4Z9JT2S");
			}).toThrow(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(function() {
				new Duration("P271Y-13M-400DT25H:61M:61S");
			}).toThrow(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(function() {
				new Duration("P0001-01-01T01:01");
			}).toThrow(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(function() {
				new Duration("P01-01T01:01:01");
			}).toThrow(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(function() {
				new Duration("P0001-01-01");
			}).toThrow(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(function() {
				new Duration("PT01:01:01");
			}).toThrow(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(function() {
				new Duration("PT01:01");
			}).toThrow(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(function() {
				new Duration("P0001-13-01T01:01:01");
			}).toThrow(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(function() {
				new Duration("P0001-01-32T01:01:01");
			}).toThrow(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(function() {
				new Duration("P0001-01-01T25:01:01");
			}).toThrow(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(function() {
				new Duration("P0001-01-01T01:61:01");
			}).toThrow(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(function() {
				new Duration("P0001-01-01T01:01:61");
			}).toThrow(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(function() {
				new Duration("P0001-13-32T25:61:61");
			}).toThrow(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(function() {
				new Duration("P");
			}).toThrow(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(function() {
				new Duration("PT");
			}).toThrow(Duration.UNEXPECTED_FORMAT_ERROR);
		});
	});

	describe('Duration Constants Tests', function() {
		var duration;

		beforeEach(function() {
			duration = new Duration();
		});

		afterEach(function() {

		});
		
		it("should know how many seconds are in a minute", function() {
			expect(duration.SECONDS_IN_A_MINUTE).toBe(60);
		});
		
		it("should know how many seconds are in an hour", function() {
			expect(duration.SECONDS_IN_AN_HOUR).toBe(60 * 60);
		});
		
		it("should know how many seconds are in a day", function() {
			expect(duration.SECONDS_IN_A_DAY).toBe(60 * 60 * 24);
		});
		
		it("should know how many seconds are in a week", function() {
			expect(duration.SECONDS_IN_A_WEEK).toBe(60 * 60 * 24 * 7);
		});
		
		it("should know how many seconds are in a month", function() {
			expect(duration.SECONDS_IN_A_MONTH).toBe(60 * 60 * 24 * 7 * 4);
		});
		
		it("should know how many seconds are in a year", function() {
			expect(duration.SECONDS_IN_A_YEAR).toBe(60 * 60 * 24 * 365);
		});
	});

	describe('Duration Cumulative Getter Tests', function() {
		var duration;

		beforeEach(function() {
			duration = new Duration("P10Y10M10DT10H10M10S");
		});

		afterEach(function() {

		});
		
		it("should return the correct cumulative number of seconds", function() {
			expect(duration.inSeconds()).toBe(
				(60 * 60 * 24 * 365 * 10) // 10 Years
				+ (60 * 60 * 24 * 7 * 4 * 10) // 10 Months
				+ (60 * 60 * 24 * 10) // 10 Days
				+ (60 * 60 * 10) // 10 Hours
				+ (60 * 10) // 10 Minutes
				+ 10); // 10 Seconds
		});
		
		it("should return the correct cumulative number of minutes", function() {
			expect(duration.inMinutes()).toBe(
				((60 * 60 * 24 * 365 * 10) // 10 Years
				+ (60 * 60 * 24 * 7 * 4 * 10) // 10 Months
				+ (60 * 60 * 24 * 10) // 10 Days
				+ (60 * 60 * 10) // 10 Hours
				+ (60 * 10) // 10 Minutes
				+ 10) / 60); // 10 Seconds
				//Divided by the number of seconds in a minute to give us the total minutes
		});
		
		it("should return the correct cumulative number of hours", function() {
			expect(duration.inHours()).toBe(
				((60 * 60 * 24 * 365 * 10) // 10 Years
				+ (60 * 60 * 24 * 7 * 4 * 10) // 10 Months
				+ (60 * 60 * 24 * 10) // 10 Days
				+ (60 * 60 * 10) // 10 Hours
				+ (60 * 10) // 10 Minutes
				+ 10) / 60 / 60); // 10 Seconds
				//Divided by the number of minutes in an hour to give us the total hours
		});
		
		it("should return the correct cumulative number of days", function() {
			expect(duration.inDays()).toBe(
				((60 * 60 * 24 * 365 * 10) // 10 Years
				+ (60 * 60 * 24 * 7 * 4 * 10) // 10 Months
				+ (60 * 60 * 24 * 10) // 10 Days
				+ (60 * 60 * 10) // 10 Hours
				+ (60 * 10) // 10 Minutes
				+ 10) / 60 / 60 / 24); // 10 Seconds
				//Divided by the number of hours in a day to give us the total days
		});
		
		it("should return the correct cumulative number of weeks", function() {
			expect(duration.inWeeks()).toBe(
				((60 * 60 * 24 * 365 * 10) // 10 Years
				+ (60 * 60 * 24 * 7 * 4 * 10) // 10 Months
				+ (60 * 60 * 24 * 10) // 10 Days
				+ (60 * 60 * 10) // 10 Hours
				+ (60 * 10) // 10 Minutes
				+ 10) / 60 / 60 / 24 / 7); // 10 Seconds
				//Divided by the number of weeks in a year to give us the total weeks
			
		});
		
		it("should return the correct cumulative number of months", function() {
			expect(duration.inMonths()).toBe(
				((60 * 60 * 24 * 365 * 10) // 10 Years
				+ (60 * 60 * 24 * 7 * 4 * 10) // 10 Months
				+ (60 * 60 * 24 * 10) // 10 Days
				+ (60 * 60 * 10) // 10 Hours
				+ (60 * 10) // 10 Minutes
				+ 10) / 60 / 60 / 24 / 7 / 4); // 10 Seconds
				//Divided by the number of weeks in a month to give us the total months
		});
		
		it("should return the correct cumulative number of years", function() {
			expect(duration.inYears()).toBe(
				((60 * 60 * 24 * 365 * 10) // 10 Years
				+ (60 * 60 * 24 * 7 * 4 * 10) // 10 Months
				+ (60 * 60 * 24 * 10) // 10 Days
				+ (60 * 60 * 10) // 10 Hours
				+ (60 * 10) // 10 Minutes
				+ 10) / 60 / 60 / 24 / 365); // 10 Seconds
				//Divided by the number of days in a year to give us the total years
		});
	});

	describe('Duration Arithmetic Tests', function() {
		
		beforeEach(function() {

		});

		afterEach(function() {

		});
		
		it("should add various other durations", function() {
			expect(((new Duration(1)).add(new Duration(1))).seconds).toBe(2);
			expect(((new Duration("PT1S")).add(new Duration(1))).seconds).toBe(2);
			expect(((new Duration('PT1M')).add(new Duration(1))).seconds).toBe(61);
			expect(((new Duration("PT1M")).add(new Duration("P2D"))).seconds).toBe(60 + (60 * 60 * 24 * 2));
			expect(((new Duration('PT10S')).add(new Duration("PT5S"))).seconds).toBe(15);
			expect(((new Duration('P2D')).add(new Duration("P1D"))).seconds).toBe(60 * 60 * 24 * 3);
			expect(((new Duration('P4Y')).add(new Duration("P2M"))).seconds).toBe((60 * 60 * 24 * 365 * 4) + (60 * 60 * 24 * 7 * 4 * 2));
		});
		
		it("should subtract various other durations", function() {
			expect(((new Duration(1)).subtract(new Duration(1))).seconds).toBe(0);
			expect(((new Duration("PT1S")).subtract(new Duration(1))).seconds).toBe(0);
			expect(((new Duration("PT1M")).subtract(new Duration(1))).seconds).toBe(59);
			expect(((new Duration("P2D")).subtract(new Duration("P1D"))).seconds).toBe(60 * 60 * 24);
			expect(((new Duration("PT13H")).subtract(new Duration("PT1H"))).seconds).toBe((60 * 60 * 13) - (60 * 60));
			expect(((new Duration("PT5M")).subtract(new Duration("PT10S"))).seconds).toBe((60 * 5) - 10);
		});
	});

	describe('Duration Formatted Getter Tests', function() {
		
		beforeEach(function() {

		});

		afterEach(function() {

		});
		
		it("should return a formatted duration in approximate terms of how long ago something was", function() {
			expect((new Duration(0).ago())).toBe('just now');
			expect((new Duration('PT0S').ago())).toBe('just now');

			expect((new Duration(1).ago())).toBe('1 second ago');
			expect((new Duration('PT1S').ago())).toBe('1 second ago');
			for (var seconds = 2; seconds < 60; seconds++) {
				expect((new Duration(seconds).ago())).toBe(seconds + ' seconds ago');
				expect((new Duration('PT' + seconds + 'S').ago())).toBe(seconds + ' seconds ago');
			}

			expect((new Duration(60).ago())).toBe('1 minute ago');
			expect((new Duration('PT1M').ago())).toBe('1 minute ago');
			expect((new Duration('PT60S').ago())).toBe('1 minute ago');
			for (var minutes = 2; minutes < 60; minutes++) {
				expect((new Duration(minutes * 60).ago())).toBe(minutes + ' minutes ago');
				expect((new Duration('PT' + minutes + 'M').ago())).toBe(minutes + ' minutes ago');
			}

			expect((new Duration(60 * 60).ago())).toBe('1 hour ago');
			expect((new Duration('PT1H').ago())).toBe('1 hour ago');
			expect((new Duration('PT60M').ago())).toBe('1 hour ago');
			for (var hours = 2; hours < 24; hours++) {
				expect((new Duration(hours * 60 * 60).ago())).toBe(hours + ' hours ago');
				expect((new Duration('PT' + hours + 'H').ago())).toBe(hours + ' hours ago');
			}

			expect((new Duration(60 * 60 * 24).ago())).toBe('1 day ago');
			expect((new Duration('P1D').ago())).toBe('1 day ago');
			expect((new Duration('PT24H').ago())).toBe('1 day ago');
			for (var days = 2; days < 7; days++) {
				expect((new Duration(days * 60 * 60 * 24).ago())).toBe(days + ' days ago');
				expect((new Duration('P' + days + 'D').ago())).toBe(days + ' days ago');
			}

			expect((new Duration(60 * 60 * 24 * 7).ago())).toBe('1 week ago');
			expect((new Duration('P1W').ago())).toBe('1 week ago');
			expect((new Duration('P7D').ago())).toBe('1 week ago');
			for (var weeks = 2; weeks < 4; weeks++) {
				expect((new Duration(weeks * 60 * 60 * 24 * 7).ago())).toBe(weeks + ' weeks ago');
				expect((new Duration('P' + weeks + 'W').ago())).toBe(weeks + ' weeks ago');
			}

			expect((new Duration(60 * 60 * 24 * 7 * 4).ago())).toBe('1 month ago');
			expect((new Duration('P1M').ago())).toBe('1 month ago');
			expect((new Duration('P4W').ago())).toBe('1 month ago');
			for (var months = 2; months < 12; months++) {
				expect((new Duration(months * 60 * 60 * 24 * 7 * 4).ago())).toBe(months + ' months ago');
				expect((new Duration('P' + months + 'M').ago())).toBe(months + ' months ago');
			}

			expect((new Duration(60 * 60 * 24 * 365).ago())).toBe('1 year ago');
			expect((new Duration('P1Y').ago())).toBe('1 year ago');
			expect((new Duration('P12M').ago())).toBe('1 year ago');
			for (var years = 2; years <= 50; years++) {
				expect((new Duration(years * 60 * 60 * 24 * 365).ago())).toBe(years + ' years ago');
				expect((new Duration('P' + years + 'Y').ago())).toBe(years + ' years ago');
			}
		});
		
		it("should return a formatted duration in terms of how much time is remaining", function() {
			expect(new Duration().remaining()).toBe("0:00");

			// TRIPLE-NESTED LOOP... ACTIVATE!
			// This kills the browser.
			for (var hours = 0; hours < 2; hours++) {
				for (var minutes = 0; minutes < 60; minutes++) {
					for (var seconds = 0; seconds < 60; seconds++) {

						var formattedString;
						if (hours == 0) {
							formattedString = sprintf('%d:%2d', minutes, seconds);
						}
						else {
							formattedString = sprintf('%d:%2d:%2d', hours, minutes, seconds);
						}

						expect(new Duration(seconds + (minutes * 60) + (hours * 60 * 24)).remaining())
							.toBe(formattedString);
						expect(new Duration('PT' + hours + 'H' + minutes + 'M' + seconds + 'S').remaining())
							.toBe(formattedString);
					}
				}
			}

		});
	});
});
