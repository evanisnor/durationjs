duration.js
=============================
A JavaScript library for parsing and handling ISO 8601 formatted Duration strings.


Features
-----------------------------
*  Parsing available for three duration string formats:
	*  P[#Y][#M][#D]T[#H][#M][#S]  or  P#W
	*  PYYYY-MM-DDTHH:MM:SS
	*  PYYYYMMDDTHHMMSS
*  Basic arithmetic for adding and subtracting durations
*  Formatted output strings (not yet implemented)


Usage
-----------------------------
In order to make use of duration.js, you must include the following javascript files to your environment in this order:

*  [sprintf-0.7-beta1.js](blob/master/js/vendor/sprintf-0.7-beta1.js)
*  [duration.js](blob/master/js/duration.js)

Initialization:

		new Duration(); // 0 seconds
		new Duration('P2W'); // 2 weeks
		new Duration('P10Y'); // 10 years
		new Duration('P1YT5H'); // 1 year 5 minutes
		new Duration('PT2S'); // 2 seconds
		new Duration('P0010-00-00T00:00:00') // 10 years
		new Duration('P0001-00-00T05:00:00') // 1 year 5 minutes

Cumulative Getters:

		// A duration of 10 years, 10 months, 10 days, 10 hours, 10 minutes and 10 seconds
		var duration = new Duration("P10Y10M10DT10H10M10S");
		duration.inSeconds(); // 340452610 seconds
		duration.inMinutes(); // 5674210.166666667 minutes
		duration.inHours(); // 94570.16944444444 hours
		duration.inDays(); // 3940.423726851852 days
		duration.inWeeks(); // 562.9176752645502 weeks
		duration.inMonths(); // 140.72941881613755 months
		duration.inYears(); // 10.79568144342973 years

Arithmetic:

		var d_10sec = new Duration("PT10S");
		var d_5sec = new Duration("PT5S");
		var d_15sec = d_10sec.add(d_5sec); // New Duration object

		var d_2days = new Duration("P2D");
		var d_1day = new Duration("P1D");
		var d_3days = d_2days.add(d_1day); // New Duration object

		var d_4years = new Duration("P4Y");
		var d_2months = new Duration("P2M");
		var d_4years2months = d_4years.add(d_2months); // New Duration object

		var d_3hours = new Duration("PT3H");
		var d_1hour = new Duration("PT1H");
		var d_2hours = d_3hours.subtract(d_1hour); // New Duration object

		var d_5mins = new Duration("PT5M");
		var d_10sec = new Duration("PT10S");
		var d_4min50sec = d_5mins.subtract(d_10sec); // New Duration object
