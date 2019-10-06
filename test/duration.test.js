'use strict';

if (typeof require === "function") {
	// ensure tests run in Karma and Mocha
	global.Duration = require('../js/duration');
	global.expect = require('chai').expect;
}

describe('Duration Test Suite', () => {
	describe('Calendar Constants Tests', () => {
		var duration;

		beforeEach(() => {
			duration = new Duration();
		});
		
		it("knows how many seconds are in a minute", () => {
			expect(duration.Calendar.Seconds.per.Minute).to.equal(60);
		});
		
		it("knows how many seconds are in an hour", () => {
			expect(duration.Calendar.Seconds.per.Hour).to.equal(60 * 60);
		});
		
		it("knows how many seconds are in a day", () => {
			expect(duration.Calendar.Seconds.per.Day).to.equal(60 * 60 * 24);
		});
		
		it("knows how many seconds are in a week", () => {
			expect(duration.Calendar.Seconds.per.Week).to.equal(60 * 60 * 24 * 7);
		});
		
		it("knows how many seconds are in a month", () => {
			expect(duration.Calendar.Seconds.per.Month).to.equal(60 * 60 * 24 * 30.4368);
		});
		
		it("knows how many seconds are in a year", () => {
			expect(duration.Calendar.Seconds.per.Year).to.equal(60 * 60 * 24 * 365.242);
		});
	});

	describe('Integer Padding Tests', () => {
		it('pads integers with leading zeroes', () => {
			var duration = new Duration();
			expect(duration.padInt(1, 0)).to.equal('');
			expect(duration.padInt(1, 1)).to.equal('1');
			expect(duration.padInt(1, 2)).to.equal('01');
			expect(duration.padInt(1, 3)).to.equal('001');
			expect(duration.padInt(1, 4)).to.equal('0001');
			expect(duration.padInt(12, 0)).to.equal('');
			expect(duration.padInt(12, 1)).to.equal('1');
			expect(duration.padInt(12, 2)).to.equal('12');
			expect(duration.padInt(12, 3)).to.equal('012');
			expect(duration.padInt(12, 4)).to.equal('0012');
		});
	});	

	describe('Duration Parsing Tests', () => {
		it("initializes at 0 seconds without parameters", () => {
			var duration = new Duration();
			expect(duration.seconds).to.equal(0);
		});

		it("parses integers as seconds", () => {
			for (var s = 0; s < 1245; s++) {
				expect((new Duration(s)).seconds).to.equal(s);
			}
		});
		
		it("parses P#Y#M#DT#H#M#S format", () => {
			expect((new Duration("P1Y1M1DT1H1M1S")).seconds).to.equal(
				(60 * 60 * 24 * 365.242) // Year
				+ (60 * 60 * 24 * 30.4368) // Month
				+ (60 * 60 * 24) // Day
				+ (60 * 60) // Hour
				+ (60) // Minute
				+ 1); // 1 Second

			expect((new Duration("P10Y10M10DT10H10M10S")).seconds).to.equal(
				(60 * 60 * 24 * 365.242 * 10) // 10 Years
				+ (60 * 60 * 24 * 30.4368 * 10) // 10 Months
				+ (60 * 60 * 24 * 10) // 10 Days
				+ (60 * 60 * 10) // 10 Hours
				+ (60 * 10) // 10 Minutes
				+ 10); // 10 Seconds

			expect((new Duration("P2Y2M2DT2H2M")).seconds).to.equal(
				(60 * 60 * 24 * 365.242 * 2) // 10 Years
				+ (60 * 60 * 24 * 30.4368 * 2) // 10 Months
				+ (60 * 60 * 24 * 2) // 10 Days
				+ (60 * 60 * 2) // 10 Hours
				+ (60 * 2)); // 10 Minutes

			expect((new Duration("P2Y2M2DT2H2M")).seconds).to.equal(
				(60 * 60 * 24 * 365.242 * 2) // 2 Years
				+ (60 * 60 * 24 * 30.4368 * 2) // 2 Months
				+ (60 * 60 * 24 * 2) // 2 Days
				+ (60 * 60 * 2) // 2 Hours
				+ (60 * 2)); // 2 Minutes

			expect((new Duration("P3Y3M3DT3H")).seconds).to.equal(
				(60 * 60 * 24 * 365.242 * 3) // 3 Years
				+ (60 * 60 * 24 * 30.4368 * 3) // 3 Months
				+ (60 * 60 * 24 * 3) // 3 Days
				+ (60 * 60 * 3)); // 3 Hours

			expect((new Duration("P4Y4M4D")).seconds).to.equal(
				(60 * 60 * 24 * 365.242 * 4) // 4 Years
				+ (60 * 60 * 24 * 30.4368 * 4) // 4 Months
				+ (60 * 60 * 24 * 4)); // 4 Days

			expect((new Duration("P5Y5M")).seconds).to.equal(
				(60 * 60 * 24 * 365.242 * 5) // 5 Years
				+ (60 * 60 * 24 * 30.4368 * 5)); // 5 Months

			expect((new Duration("P6Y")).seconds).to.equal(
				(60 * 60 * 24 * 365.242 * 6)); // 6 Years

			expect((new Duration("P11M11DT11H11M11S")).seconds).to.equal(
				(60 * 60 * 24 * 30.4368 * 11) // 11 Months
				+ (60 * 60 * 24 * 11) // 11 Days
				+ (60 * 60 * 11) // 11 Hours
				+ (60 * 11) // 11 Minutes
				+ 11); // 11 Seconds

			expect((new Duration("P12DT12H12M12S")).seconds).to.equal(
				(60 * 60 * 24 * 12) // 12 Days
				+ (60 * 60 * 12) // 12 Hours
				+ (60 * 12) // 12 Minutes
				+ 12); // 12 Seconds

			expect((new Duration("PT13H13M13S")).seconds).to.equal(
				(60 * 60 * 13) // 13 Hours
				+ (60 * 13) // 13 Minutes
				+ 13); // 13 Seconds

			expect((new Duration("PT14M14S")).seconds).to.equal(
				(60 * 14) // 14 Minutes
				+ 14); // 14 Seconds

			expect((new Duration("PT15S")).seconds).to.equal(
				15); // 15 Seconds

			expect((new Duration("PT61S")).seconds).to.equal(
				61); // 61 Seconds

			expect((new Duration("PT61M61S")).seconds).to.equal(
				(60 * 61) // 61 Minutes
				+ 61); // 61 Seconds

			expect((new Duration("PT25H61M61S")).seconds).to.equal(
				(60 * 60 * 25) // 25 Hours
				+ (60 * 61) // 61 Minutes
				+ 61); // 61 Seconds

			expect((new Duration("P400DT25H61M61S")).seconds).to.equal(
				(60 * 60 * 24 * 400) // 400 Days
				+ (60 * 60 * 25) // 25 Hours
				+ (60 * 61) // 61 Minutes
				+ 61); // 61 Seconds

			expect((new Duration("P13M400DT25H61M61S")).seconds).to.equal(
				(60 * 60 * 24 * 30.4368 * 13) // 13 Months
				+ (60 * 60 * 24 * 400) // 400 Days
				+ (60 * 60 * 25) // 25 Hours
				+ (60 * 61) // 61 Minutes
				+ 61); // 61 Seconds

			expect((new Duration("P271Y13M400DT25H61M61S")).seconds).to.equal(
				(60 * 60 * 24 * 365.242 * 271) // 271 Years
				+ (60 * 60 * 24 * 30.4368 * 13) // 13 Months
				+ (60 * 60 * 24 * 400) // 400 Days
				+ (60 * 60 * 25) // 25 Hours
				+ (60 * 61) // 61 Minutes
				+ 61); // 61 Seconds

			expect((new Duration("P45Y8M2DT574H7021M4S")).seconds).to.equal(
				(60 * 60 * 24 * 365.242 * 45) // 45 Years
				+ (60 * 60 * 24 * 30.4368 * 8) // 8 Months
				+ (60 * 60 * 24 * 2) // 2 Days
				+ (60 * 60 * 574) // 574 Hours
				+ (60 * 7021) // 7021 Minutes
				+ 4); // 4 Seconds
		});

		it("parses fraction of a second", () => {
			expect((new Duration("PT4.5S")).seconds).to.equal(4.5);
		});

		it("parses fraction of a minute", () => {
			expect((new Duration("PT0.5M")).seconds).to.equal(30);
		});

		it("parses fraction of an hour", () => {
			expect((new Duration("PT0.1H")).seconds).to.equal(360);
		});

		it("parses fraction of a day", () => {
			expect((new Duration("P0.1D")).seconds).to.equal(8640);
		});

		it("parses fraction of a month", () => {
			expect((new Duration("P0.001M")).seconds).to.equal(2629.73952);
		});

		it("parses fraction of a year", () => {
			expect((new Duration("P0.001Y")).seconds).to.equal(31556.9088);
		});

		it("parses P#W format", () => {
			expect((new Duration("P1W")).seconds).to.equal(
				+ (60 * 60 * 24 * 7 * 1)); // 1 Week

			expect((new Duration("P2W")).seconds).to.equal(
				+ (60 * 60 * 24 * 7 * 2)); // 2 Weeks

			expect((new Duration("P5W")).seconds).to.equal(
				+ (60 * 60 * 24 * 7 * 5)); // 5 Weeks

			expect((new Duration("P20W")).seconds).to.equal(
				+ (60 * 60 * 24 * 7 * 20)); // 20 Weeks

			expect((new Duration("P53W")).seconds).to.equal(
				+ (60 * 60 * 24 * 7 * 53)); // 53 Weeks

			expect((new Duration("P243W")).seconds).to.equal(
				+ (60 * 60 * 24 * 7 * 243)); // 243 Weeks
		});

		it("parses P[YYYY][MM][DD]T[hh][mm][ss] format", () => {
			expect((new Duration("P00010101T010101")).seconds).to.equal(
				(60 * 60 * 24 * 365.242 * 1) // 1 Year
				+ (60 * 60 * 24 * 30.4368 * 1) // 1 Month
				+ (60 * 60 * 24 * 1) // 1 Day
				+ (60 * 60 * 1) // 1 Hour
				+ (60 * 1) // 1 Minute
				+ 1); // 1 Second

			expect((new Duration("P00241102T100447")).seconds).to.equal(
				(60 * 60 * 24 * 365.242 * 24) // 24 Years
				+ (60 * 60 * 24 * 30.4368 * 11) // 11 Months
				+ (60 * 60 * 24 * 2) // 2 Days
				+ (60 * 60 * 10) // 10 Hours
				+ (60 * 4) // 4 Minutes
				+ 47); // 47 Seconds
		});

		it("parses P[YYYY]-[MM]-[DD]T[hh]:[mm]:[ss] format", () => {
			expect((new Duration("P0001-01-01T01:01:01")).seconds).to.equal(
				(60 * 60 * 24 * 365.242 * 1) // 1 Year
				+ (60 * 60 * 24 * 30.4368 * 1) // 1 Month
				+ (60 * 60 * 24 * 1) // 1 Day
				+ (60 * 60 * 1) // 1 Hour
				+ (60 * 1) // 1 Minute
				+ 1); // 1 Second

			expect((new Duration("P0024-11-02T10:04:47")).seconds).to.equal(
				(60 * 60 * 24 * 365.242 * 24) // 24 Years
				+ (60 * 60 * 24 * 30.4368 * 11) // 11 Months
				+ (60 * 60 * 24 * 2) // 2 Days
				+ (60 * 60 * 10) // 10 Hours
				+ (60 * 4) // 4 Minutes
				+ 47); // 47 Seconds
		});

		it ("fails to parse improperly formatted duration strings", () => {
			expect(() => {
				new Duration("this is garbage data lol");
			}).to.throw(Duration.UNEXPECTED_FORMAT_ERROR);
			
			expect(() => {
				new Duration("*(^#$JDJ34h fw5ad..6fjw#D 343");
			}).to.throw(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(() => {
				new Duration("P20S");
			}).to.throw(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(() => {
				new Duration("P3Y6W");
			}).to.throw(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(() => {
				new Duration("P3Y6S");
			}).to.throw(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(() => {
				new Duration("P4Z9JT2S");
			}).to.throw(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(() => {
				new Duration("P271Y-13M-400DT25H:61M:61S");
			}).to.throw(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(() => {
				new Duration("P0001-01-01T01:01");
			}).to.throw(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(() => {
				new Duration("P01-01T01:01:01");
			}).to.throw(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(() => {
				new Duration("P0001-01-01");
			}).to.throw(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(() => {
				new Duration("PT01:01:01");
			}).to.throw(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(() => {
				new Duration("PT01:01");
			}).to.throw(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(() => {
				new Duration("P0001-12-01T01:01:01");
			}).to.throw(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(() => {
				new Duration("P0001-01-32T01:01:01");
			}).to.throw(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(() => {
				new Duration("P0001-01-01T24:01:01");
			}).to.throw(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(() => {
				new Duration("P0001-01-01T01:60:01");
			}).to.throw(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(() => {
				new Duration("P0001-01-01T01:01:60");
			}).to.throw(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(() => {
				new Duration("P0001-13-32T25:60:60");
			}).to.throw(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(() => {
				new Duration("P");
			}).to.throw(Duration.UNEXPECTED_FORMAT_ERROR);

			expect(() => {
				new Duration("PT");
			}).to.throw(Duration.UNEXPECTED_FORMAT_ERROR);
		});
	});

	describe('Duration Cumulative Getter Tests', () => {
		var duration;

		beforeEach(() => {
			duration = new Duration("P10Y10M10DT10H10M10S");
		});
		
		it("returns the correct cumulative number of seconds", () => {
			expect(duration.inSeconds()).to.equal(
				(60 * 60 * 24 * 365.242 * 10) // 10 Years
				+ (60 * 60 * 24 * 30.4368 * 10) // 10 Months
				+ (60 * 60 * 24 * 10) // 10 Days
				+ (60 * 60 * 10) // 10 Hours
				+ (60 * 10) // 10 Minutes
				+ 10); // 10 Seconds
		});
		
		it("returns the correct cumulative number of minutes", () => {
			expect(duration.inMinutes()).to.equal(
				((60 * 60 * 24 * 365.242 * 10) // 10 Years
				+ (60 * 60 * 24 * 30.4368 * 10) // 10 Months
				+ (60 * 60 * 24 * 10) // 10 Days
				+ (60 * 60 * 10) // 10 Hours
				+ (60 * 10) // 10 Minutes
				+ 10) / 60); // 10 Seconds
				//Divided by the number of seconds in a minute to give us the total minutes
		});
		
		it("returns the correct cumulative number of hours", () => {
			expect(duration.inHours()).to.equal(
				((60 * 60 * 24 * 365.242 * 10) // 10 Years
				+ (60 * 60 * 24 * 30.4368 * 10) // 10 Months
				+ (60 * 60 * 24 * 10) // 10 Days
				+ (60 * 60 * 10) // 10 Hours
				+ (60 * 10) // 10 Minutes
				+ 10) / 60 / 60); // 10 Seconds
				//Divided by the number of minutes in an hour to give us the total hours
		});
		
		it("returns the correct cumulative number of days", () => {
			expect(duration.inDays()).to.equal(
				((60 * 60 * 24 * 365.242 * 10) // 10 Years
				+ (60 * 60 * 24 * 30.4368 * 10) // 10 Months
				+ (60 * 60 * 24 * 10) // 10 Days
				+ (60 * 60 * 10) // 10 Hours
				+ (60 * 10) // 10 Minutes
				+ 10) / 60 / 60 / 24); // 10 Seconds
				//Divided by the number of hours in a day to give us the total days
		});
		
		it("returns the correct cumulative number of weeks", () => {
			expect(duration.inWeeks()).to.equal(
				((60 * 60 * 24 * 365.242 * 10) // 10 Years
				+ (60 * 60 * 24 * 30.4368 * 10) // 10 Months
				+ (60 * 60 * 24 * 10) // 10 Days
				+ (60 * 60 * 10) // 10 Hours
				+ (60 * 10) // 10 Minutes
				+ 10) / 60 / 60 / 24 / 7); // 10 Seconds
				//Divided by the number of weeks in a year to give us the total weeks
			
		});
		
		it("returns the correct cumulative number of months", () => {
			expect(duration.inMonths()).to.equal(
				((60 * 60 * 24 * 365.242 * 10) // 10 Years
				+ (60 * 60 * 24 * 30.4368 * 10) // 10 Months
				+ (60 * 60 * 24 * 10) // 10 Days
				+ (60 * 60 * 10) // 10 Hours
				+ (60 * 10) // 10 Minutes
				+ 10) / 60 / 60 / 24 / 30.4368); // 10 Seconds
				//Divided by the number of weeks in a month to give us the total months
		});
		
		it("returns the correct cumulative number of years", () => {
			expect(duration.inYears()).to.equal(
				((60 * 60 * 24 * 365.242 * 10) // 10 Years
				+ (60 * 60 * 24 * 30.4368 * 10) // 10 Months
				+ (60 * 60 * 24 * 10) // 10 Days
				+ (60 * 60 * 10) // 10 Hours
				+ (60 * 10) // 10 Minutes
				+ 10) / 60 / 60 / 24 / 365.242); // 10 Seconds
				//Divided by the number of days in a year to give us the total years
		});
	});

	describe('Duration Arithmetic Tests', () => {		
		it("adds various other durations", () => {
			expect(((new Duration(1)).add(new Duration(1))).seconds).to.equal(2);
			expect(((new Duration("PT1S")).add(new Duration(1))).seconds).to.equal(2);
			expect(((new Duration('PT1M')).add(new Duration(1))).seconds).to.equal(61);
			expect(((new Duration("PT1M")).add(new Duration("P2D"))).seconds).to.equal(60 + (60 * 60 * 24 * 2));
			expect(((new Duration('PT10S')).add(new Duration("PT5S"))).seconds).to.equal(15);
			expect(((new Duration('P2D')).add(new Duration("P1D"))).seconds).to.equal(60 * 60 * 24 * 3);
			expect(((new Duration('P4Y')).add(new Duration("P2M"))).seconds).to.equal((60 * 60 * 24 * 365.242 * 4) + (60 * 60 * 24 * 30.4368 * 2));
		});
		
		it("subtracts various other durations", () => {
			expect(((new Duration(1)).subtract(new Duration(1))).seconds).to.equal(0);
			expect(((new Duration("PT1S")).subtract(new Duration(1))).seconds).to.equal(0);
			expect(((new Duration("PT1M")).subtract(new Duration(1))).seconds).to.equal(59);
			expect(((new Duration("P2D")).subtract(new Duration("P1D"))).seconds).to.equal(60 * 60 * 24);
			expect(((new Duration("PT13H")).subtract(new Duration("PT1H"))).seconds).to.equal((60 * 60 * 13) - (60 * 60));
			expect(((new Duration("PT5M")).subtract(new Duration("PT10S"))).seconds).to.equal((60 * 5) - 10);
		});
	});

	describe('Duration Formatted Getter Tests', () => {
		it('returns an object that has the parsed values', () => {
			var d1 = new Duration('P1Y1M1DT1H1M1S');
			expect(d1.value().years).to.equal(1);
			expect(d1.value().months).to.equal(1);
			expect(d1.value().days).to.equal(1);
			expect(d1.value().hours).to.equal(1);
			expect(d1.value().minutes).to.equal(1);
			expect(d1.value().seconds).to.equal(1);

			var d2 = new Duration('P5Y1M20DT4H23M40S');
			expect(d2.value().years).to.equal(5);
			expect(d2.value().months).to.equal(1);
			expect(d2.value().days).to.equal(20);
			expect(d2.value().hours).to.equal(4);
			expect(d2.value().minutes).to.equal(23);
			expect(d2.value().seconds).to.equal(40);

			var d3 = new Duration('PT4H23M40S');
			expect(d3.value().years).to.equal(0);
			expect(d3.value().months).to.equal(0);
			expect(d3.value().days).to.equal(0);
			expect(d3.value().hours).to.equal(4);
			expect(d3.value().minutes).to.equal(23);
			expect(d3.value().seconds).to.equal(40);

			var d4 = new Duration('P24Y3MT4S');
			expect(d4.value().years).to.equal(24);
			expect(d4.value().months).to.equal(3);
			expect(d4.value().days).to.equal(0);
			expect(d4.value().hours).to.equal(0);
			expect(d4.value().minutes).to.equal(0);
			expect(d4.value().seconds).to.equal(4);
		});
		
		it("returns a formatted duration in approximate terms of how long ago something was", () => {
			expect((new Duration(0).ago())).to.equal('just now');
			expect((new Duration('PT0S').ago())).to.equal('just now');

			expect((new Duration(1).ago())).to.equal('1 second ago');
			expect((new Duration('PT1S').ago())).to.equal('1 second ago');
			for (var seconds = 2; seconds < 60; seconds++) {
				expect((new Duration(seconds).ago())).to.equal(seconds + ' seconds ago');
				expect((new Duration('PT' + seconds + 'S').ago())).to.equal(seconds + ' seconds ago');
			}

			expect((new Duration(60).ago())).to.equal('1 minute ago');
			expect((new Duration('PT1M').ago())).to.equal('1 minute ago');
			expect((new Duration('PT60S').ago())).to.equal('1 minute ago');
			for (var minutes = 2; minutes < 60; minutes++) {
				expect((new Duration(minutes * 60).ago())).to.equal(minutes + ' minutes ago');
				expect((new Duration('PT' + minutes + 'M').ago())).to.equal(minutes + ' minutes ago');
			}

			expect((new Duration(60 * 60).ago())).to.equal('1 hour ago');
			expect((new Duration('PT1H').ago())).to.equal('1 hour ago');
			expect((new Duration('PT60M').ago())).to.equal('1 hour ago');
			for (var hours = 2; hours < 24; hours++) {
				expect((new Duration(hours * 60 * 60).ago())).to.equal(hours + ' hours ago');
				expect((new Duration('PT' + hours + 'H').ago())).to.equal(hours + ' hours ago');
			}

			expect((new Duration(60 * 60 * 24).ago())).to.equal('1 day ago');
			expect((new Duration('P1D').ago())).to.equal('1 day ago');
			expect((new Duration('PT24H').ago())).to.equal('1 day ago');
			for (var days = 2; days < 7; days++) {
				expect((new Duration(days * 60 * 60 * 24).ago())).to.equal(days + ' days ago');
				expect((new Duration('P' + days + 'D').ago())).to.equal(days + ' days ago');
			}

			expect((new Duration(60 * 60 * 24 * 7).ago())).to.equal('1 week ago');
			expect((new Duration('P1W').ago())).to.equal('1 week ago');
			expect((new Duration('P7D').ago())).to.equal('1 week ago');
			for (var weeks = 2; weeks < 4; weeks++) {
				expect((new Duration(weeks * 60 * 60 * 24 * 7).ago())).to.equal(weeks + ' weeks ago');
				expect((new Duration('P' + weeks + 'W').ago())).to.equal(weeks + ' weeks ago');
			}

			expect((new Duration('P4W')).ago()).to.equal('4 weeks ago');

			expect((new Duration(60 * 60 * 24 * 30.4368)).ago()).to.equal('1 month ago');
			expect((new Duration('P1M')).ago()).to.equal('1 month ago');
			for (var months = 2; months < 12; months++) {
				expect((new Duration(months * 60 * 60 * 24 * 30.4368).ago())).to.equal(months + ' months ago');
				expect((new Duration('P' + months + 'M').ago())).to.equal(months + ' months ago');
			}

			expect((new Duration(60 * 60 * 24 * 365.242).ago())).to.equal('1 year ago');
			expect((new Duration('P1Y').ago())).to.equal('1 year ago');
			for (var years = 2; years <= 50; years++) {
				expect((new Duration(years * 60 * 60 * 24 * 365.242).ago())).to.equal(years + ' years ago');
				expect((new Duration('P' + years + 'Y').ago())).to.equal(years + ' years ago');
			}
		});
		
		it("returns a formatted duration in approximate terms", () => {
			expect((new Duration(0).approx())).to.equal('right now');
			expect((new Duration('PT0S').approx())).to.equal('right now');

			expect((new Duration(1).approx())).to.equal('1 second');
			expect((new Duration('PT1S').approx())).to.equal('1 second');
			for (var seconds = 2; seconds < 60; seconds++) {
				expect((new Duration(seconds).approx())).to.equal(seconds + ' seconds');
				expect((new Duration('PT' + seconds + 'S').approx())).to.equal(seconds + ' seconds');
			}

			expect((new Duration(60).approx())).to.equal('1 minute');
			expect((new Duration('PT1M').approx())).to.equal('1 minute');
			expect((new Duration('PT60S').approx())).to.equal('1 minute');
			for (var minutes = 2; minutes < 60; minutes++) {
				expect((new Duration(minutes * 60).approx())).to.equal(minutes + ' minutes');
				expect((new Duration('PT' + minutes + 'M').approx())).to.equal(minutes + ' minutes');
			}

			expect((new Duration(60 * 60).approx())).to.equal('1 hour');
			expect((new Duration('PT1H').approx())).to.equal('1 hour');
			expect((new Duration('PT60M').approx())).to.equal('1 hour');
			for (var hours = 2; hours < 24; hours++) {
				expect((new Duration(hours * 60 * 60).approx())).to.equal(hours + ' hours');
				expect((new Duration('PT' + hours + 'H').approx())).to.equal(hours + ' hours');
			}

			expect((new Duration(60 * 60 * 24).approx())).to.equal('1 day');
			expect((new Duration('P1D').approx())).to.equal('1 day');
			expect((new Duration('PT24H').approx())).to.equal('1 day');
			for (var days = 2; days < 7; days++) {
				expect((new Duration(days * 60 * 60 * 24).approx())).to.equal(days + ' days');
				expect((new Duration('P' + days + 'D').approx())).to.equal(days + ' days');
			}

			expect((new Duration(60 * 60 * 24 * 7).approx())).to.equal('1 week');
			expect((new Duration('P1W').approx())).to.equal('1 week');
			expect((new Duration('P7D').approx())).to.equal('1 week');
			for (var weeks = 2; weeks < 4; weeks++) {
				expect((new Duration(weeks * 60 * 60 * 24 * 7).approx())).to.equal(weeks + ' weeks');
				expect((new Duration('P' + weeks + 'W').approx())).to.equal(weeks + ' weeks');
			}

			expect((new Duration('P4W')).approx()).to.equal('4 weeks');

			expect((new Duration(60 * 60 * 24 * 30.4368)).approx()).to.equal('1 month');
			expect((new Duration('P1M')).approx()).to.equal('1 month');
			for (var months = 2; months < 12; months++) {
				expect((new Duration(months * 60 * 60 * 24 * 30.4368).approx())).to.equal(months + ' months');
				expect((new Duration('P' + months + 'M').approx())).to.equal(months + ' months');
			}

			expect((new Duration(60 * 60 * 24 * 365.242).approx())).to.equal('1 year');
			expect((new Duration('P1Y').approx())).to.equal('1 year');
			for (var years = 2; years <= 50; years++) {
				expect((new Duration(years * 60 * 60 * 24 * 365.242).approx())).to.equal(years + ' years');
				expect((new Duration('P' + years + 'Y').approx())).to.equal(years + ' years');
			}
		});

		it("returns a formatted duration in terms of how much time is remaining", () => {
			expect((new Duration()).asClock()).to.equal("0:00");

			// TRIPLE-NESTED LOOP... ACTIVATE!
			// This kills the browser.
			for (var hours = 0; hours < 2; hours++) {
				for (var minutes = 0; minutes < 60; minutes++) {
					for (var seconds = 0; seconds < 60; seconds++) {

						var formattedString;
						if (hours == 0) {
							formattedString = minutes + ':' + ((seconds < 10) ? '0' + seconds : seconds);
						}
						else {
							formattedString = hours + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
						}

						expect((new Duration((hours * 60 * 60) + (minutes * 60) + seconds)).asClock())
							.to.equal(formattedString);
						expect((new Duration('PT' + hours + 'H' + minutes + 'M' + seconds + 'S')).asClock())
							.to.equal(formattedString);
					}
				}
			}

		});
		
		it("returns a valid ISO 8601 duration string", () => {
			expect((new Duration('P1Y1M1DT1H1M1S')).asStandard()).to.equal('P1Y1M1DT1H1M1S');
			expect((new Duration('P1Y1M1DT1H1M1S')).asStandardWeeks()).to.equal('P56W');
			expect((new Duration('P1Y1M1DT1H1M1S')).asExtended()).to.equal('P0001-01-01T01:01:01');
			expect((new Duration('P1Y1M1DT1H1M1S')).asBasic()).to.equal('P00010101T010101');

			expect((new Duration('P3Y10M21DT1H50M43S')).asStandard()).to.equal('P3Y10M21DT1H50M43S');
			expect((new Duration('P3Y10M21DT1H50M43S')).asStandardWeeks()).to.equal('P203W');
			expect((new Duration('P3Y10M21DT1H50M43S')).asExtended()).to.equal('P0003-10-21T01:50:43');
			expect((new Duration('P3Y10M21DT1H50M43S')).asBasic()).to.equal('P00031021T015043');

			expect((new Duration()).asStandard()).to.equal('PT0S');
			expect((new Duration()).asExtended()).to.equal('P0000-00-00T00:00:00');
			expect((new Duration()).asBasic()).to.equal('P00000000T000000');

			expect((new Duration('P3Y')).asStandard()).to.equal('P3Y');
			expect((new Duration('P3Y')).asExtended()).to.equal('P0003-00-00T00:00:00');
			expect((new Duration('P3Y')).asBasic()).to.equal('P00030000T000000');

			expect((new Duration('P3M')).asStandard()).to.equal('P3M');
			expect((new Duration('P3M')).asExtended()).to.equal('P0000-03-00T00:00:00');
			expect((new Duration('P3M')).asBasic()).to.equal('P00000300T000000');

			expect((new Duration('P3D')).asStandard()).to.equal('P3D');
			expect((new Duration('P3D')).asExtended()).to.equal('P0000-00-03T00:00:00');
			expect((new Duration('P3D')).asBasic()).to.equal('P00000003T000000');

			expect((new Duration('PT3H')).asStandard()).to.equal('PT3H');
			expect((new Duration('PT3H')).asExtended()).to.equal('P0000-00-00T03:00:00');
			expect((new Duration('PT3H')).asBasic()).to.equal('P00000000T030000');

			expect((new Duration('PT3M')).asStandard()).to.equal('PT3M');
			expect((new Duration('PT3M')).asExtended()).to.equal('P0000-00-00T00:03:00');
			expect((new Duration('PT3M')).asBasic()).to.equal('P00000000T000300');

			expect((new Duration('PT3S')).asStandard()).to.equal('PT3S');
			expect((new Duration('PT3S')).asExtended()).to.equal('P0000-00-00T00:00:03');
			expect((new Duration('PT3S')).asBasic()).to.equal('P00000000T000003');
		});
	});
});
