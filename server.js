/* Copyright IBM Corp. 2014 All Rights Reserved                      */

// Bring in the Express framework
var express = require('express');
var app = express();

// Determine port our app will run on
var port = (process.env.VCAP_APP_PORT || 3000);

// We want to enable the reverse proxy support in
// Express: http://expressjs.com/api#app-settings
app.enable('trust proxy');

// Add a handling to inspect the req.secure flag (see 
// http://expressjs.com/api#req.secure) to know whether 
// the request was via http or https.
app.use (function (req, res, next) {
	if (req.secure) {
		// request was via https, so do no
		// special handling
		next();
	} else {
		// request was via http, so redirect to
		// https
		res.redirect('https://' + req.headers.host + req.url);
	}
});

// Allow static files from the public directory to be served
app.use(express.static(__dirname + '/public'));

var server = app.listen(port, function() {
	console.log('Listening on port %d', server.address().port);
});