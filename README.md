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
*  Formatted output strings


Usage
-----------------------------
To make use of duration.js you must reference the [duration.js](js/duration.js) file in your environment before you execute code that utilizes the Duration object. Probably like this:

		<script src="duration.js" />
		<script src="myscript.js" />

Instantiation:

		new Duration(); // 0 seconds
		new Duration('P2W'); // 2 weeks
		new Duration('P10Y'); // 10 years
		new Duration('P1YT5H'); // 1 year 5 minutes
		new Duration('PT2S'); // 2 seconds
		new Duration('P45Y8M2DT574H7021M4S'); // 45 years, 8 minutes, 2 days, 574 hours, 7021 minutes and 4 seconds
		new Duration('P0010-00-00T00:00:00') // 10 years
		new Duration('P0001-00-00T05:00:00') // 1 year 5 minutes

Cumulative Getters:

		// A duration of 10 years, 10 months, 10 days, 10 hours, 10 minutes and 10 seconds
		var duration = new Duration('P10Y10M10DT10H10M10S');
		duration.inSeconds(); // 340452610 seconds
		duration.inMinutes(); // 5674210.166666667 minutes
		duration.inHours(); // 94570.16944444444 hours
		duration.inDays(); // 3940.423726851852 days
		duration.inWeeks(); // 562.9176752645502 weeks
		duration.inMonths(); // 140.72941881613755 months
		duration.inYears(); // 10.79568144342973 years

Formatted Output:
		
		(new Duration(0)).ago(); // 'just now'
		(new Duration('PT1S')).ago(); // '1 second ago'
		(new Duration('PT4M')).ago(); // '4 minutes ago'
		(new Duration('PT8D4M50S')).ago(); // '8 days ago'
		(new Duration('P60Y4M')).ago(); // '60 years ago'

		(new Duration()).remaining(); // '0:00'
		(new Duration(PT1S)).remaining(); // '0:01'
		(new Duration(PT4M)).remaining(); // '4:00'
		(new Duration(P1DT10M)).remaining(); // '24:10:00'

Arithmetic:

		var d_10sec = new Duration('PT10S');
		var d_5sec = new Duration('PT5S');
		var d_15sec = d_10sec.add(d_5sec); // New Duration object

		var d_2days = new Duration('P2D');
		var d_1day = new Duration('P1D');
		var d_3days = d_2days.add(d_1day); // New Duration object

		var d_4years = new Duration('P4Y');
		var d_2months = new Duration('P2M');
		var d_4years2months = d_4years.add(d_2months); // New Duration object

		var d_3hours = new Duration('PT3H');
		var d_1hour = new Duration('PT1H');
		var d_2hours = d_3hours.subtract(d_1hour); // New Duration object

		var d_5mins = new Duration('PT5M');
		var d_10sec = new Duration('PT10S');
		var d_4min50sec = d_5mins.subtract(d_10sec); // New Duration object


Contributing
-----------------------------
If you feel a burning desire to contribute to this project you may do so with some caveats:

*  Write unit tests if you add features
*  If you add files update the testacular config to include them
*  Ensure your Pull Requests target develop as their destination


Running the Unit Tests
-----------------------------
Unit tests are written using the [Jasmine](http://pivotal.github.com/jasmine/) framework. You can run them however you like, but I use [Testacular](http://testacular.github.com/). If you would like to do the same, follow these steps:

1.  Install [node.js](http://nodejs.org/)

2.  Install the [Testacular node.js module](https://npmjs.org/package/testacular) and [Jasmine node.js module](https://npmjs.org/package/jasmine-node)

		npm install -d

4.  Browse to your cloned repository directory and start Testacular

	testacular start duration.testacular.conf.js
or
	npm test

5.  Open a web browser (or a few) to the URL printed in your console. Probably http://localhost:9876

6.  Watch as Testacular evaluates the tests in the /test directory that have file names matching '*.test.js'. This evaulation will execute automatically the next time you save your file modifications.
