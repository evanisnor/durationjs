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
*  Formatted output strings (currently in progress)


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

		var 10sec = new Duration("PT10S");
		var 5sec = new Duration("PT5S");
		var 15sec = 10sec.add(5sec); // New Duration object

		var 2days = new Duration("P2D");
		var 1day = new Duration("P1D");
		var 3days = 2days.add(1day); // New Duration object

		var 4years = new Duration("P4Y");
		var 2months = new Duration("P2M");
		var 4years2months = 4years.add(2months); // New Duration object

		var 3hours = new Duration("PT3H");
		var 1hour = new Duration("PT1H");
		var 2hours = 3hours.subtract(1hour); // New Duration object

		var 5mins = new Duration("PT5M");
		var 10sec = new Duration("PT10S");
		var 4min50sec = 5mins.subtract(10sec); // New Duration object
