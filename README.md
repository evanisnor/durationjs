duration.js
=============================

[![Node.js CI](https://github.com/matthewturner/durationjs/actions/workflows/node.js.yml/badge.svg)](https://github.com/matthewturner/durationjs/actions/workflows/node.js.yml) [![CodeQL](https://github.com/matthewturner/durationjs/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/matthewturner/durationjs/actions/workflows/github-code-scanning/codeql)

A JavaScript library for parsing and manipulating ISO 8601 formatted duration strings.

Features
-----------------------------
*  Parsing available for three duration string formats:
	*  P[#Y][#M][#D]T[#H][#M][#S]  or  P#W
	*  PYYYY-MM-DDTHH:MM:SS
	*  PYYYYMMDDTHHMMSS
*  Time periods represented by weeks, months and years are calculated using average values
*  Basic arithmetic for adding and subtracting durations
*  Formatted output strings
*  No other dependencies

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
		new Duration('P0010-00-00T00:00:00'); // 10 years
		new Duration('P0001-00-00T05:00:00'); // 1 year 5 minutes

Methods
-----------------------------

	value()				Get a JSON object with the individual duration values

	inYears()			Get float values that represent the entire duration
	inMonths()
	inWeeks()
	inDays()
	inHours()
	inMinutes()
	inSeconds()

	approx()			Get an approximate human-readable string that describes
						the duration, such as: '15 minutes'.

	ago()				Get an approximate human-readable string that describes
						the duration in the past, such as: '15 minutes ago'.

	asClock()			Get the duration represented as a digital clock that only
						shows seconds, minutes and hours if present.
						Example: '45:10:00' means 45 hours and 10 minutes

	asStandard()		Get the duration as an ISO 8601-compliant standard duration
						string. Example: 'P2DT4H30M'

	asStandardWeeks()	Get the duration as an ISO 8601-compliant standard duration
						string in the number of weeks. Example: 'P45W'

	asExtended()		Get the duration as an ISO 8601-compliant extended duration
						string. Example: 'P0003-10-21T01:50:43'

	asBasic()			Get the duration as an ISO 8601-compliant basic duration
						string. Example: 'P00031021T015043'

	add(Duration)		Add two Durations together to produce a new Duration object.

	subtract(Duration)	Subtract one Duration from another to produce a new Duration
						object.

Examples
-----------------------------

Parsed Values as an Object:

		(new Duration('P3Y10M21DT1H50M43S')).value();
		// returns:
		{ 
			years : 3,
			months : 10,
			days : 21,
			hours : 1,
			minutes : 50,
			seconds : 43
		}

Cumulative Getters:

		// A duration of 10 years, 10 months, 10 days, 10 hours, 10 minutes and 10 seconds
		var duration = new Duration('P10Y10M10DT10H10M10S');
		duration.inYears(); // 10.861871654551917
		duration.inMonths(); // 130.34260260118842
		duration.inWeeks(); // 566.7445324074074
		duration.inDays(); // 3967.211726851852
		duration.inHours(); // 95213.08144444444
		duration.inMinutes(); // 5712784.886666667
		duration.inSeconds(); // 342767093.2

Compliant Output (useful for conversions):

		(new Duration('P3Y10M21DT1H50M43S')).asStandard(); // 'P3Y10M21DT1H50M43S'
		(new Duration('P3Y10M21DT1H50M43S')).asStandardWeeks(); // 'P203W'
		(new Duration('P3Y10M21DT1H50M43S')).asExtended(); // 'P0003-10-21T01:50:43'
		(new Duration('P3Y10M21DT1H50M43S')).asBasic(); // 'P00031021T015043'

Formatted Output:
		
		(new Duration(0)).ago(); // 'just now'
		(new Duration('PT1S')).ago(); // '1 second ago'
		(new Duration('PT4M')).ago(); // '4 minutes ago'
		(new Duration('PT8D4M50S')).ago(); // '8 days ago'
		(new Duration('P60Y4M')).ago(); // '60 years ago'

		(new Duration()).asClock(); // '0:00'
		(new Duration('PT1S')).asClock(); // '0:01'
		(new Duration('PT4M')).asClock(); // '4:00'
		(new Duration('P1DT10M')).asClock(); // '24:10:00'

Arithmetic:

		var d_10sec = new Duration('PT10S');
		var d_5sec = new Duration('PT5S');
		var d_15sec = d_10sec.add(d_5sec); // New Duration object as 15 seconds

		var d_2days = new Duration('P2D');
		var d_1day = new Duration('P1D');
		var d_3days = d_2days.add(d_1day); // New Duration object as 3 days

		var d_4years = new Duration('P4Y');
		var d_2months = new Duration('P2M');
		var d_4years2months = d_4years.add(d_2months); // New Duration object as 4 years 2 months

		var d_3hours = new Duration('PT3H');
		var d_1hour = new Duration('PT1H');
		var d_2hours = d_3hours.subtract(d_1hour); // New Duration object as 2 hours

		var d_5mins = new Duration('PT5M');
		var d_10sec = new Duration('PT10S');
		var d_4min50sec = d_5mins.subtract(d_10sec); // New Duration object as 4 minutes 50 seconds


Contributing
-----------------------------
If you feel a burning desire to contribute to this project you may do so with some caveats:

*  Write unit tests if you add features
*  If you add files update the testacular config to include them
*  Work out of the develop branch and ensure your Pull Requests target develop as their destination


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
