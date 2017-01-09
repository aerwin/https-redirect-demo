/* Copyright IBM Corp. 2014 All Rights Reserved                      */

// Require and create the Express framework
var express = require('express');
var app = express();

// Determine port to listen on
var port = (process.env.PORT || process.env.VCAP_APP_PORT || 3000);

// Enable reverse proxy support in Express. This causes the
// the "X-Forwarded-Proto" header field to be trusted so its
// value can be used to determine the protocol. See 
// http://expressjs.com/api#app-settings for more details.
app.enable('trust proxy');

// Add a handler to inspect the req.secure flag (see 
// http://expressjs.com/api#req.secure). This allows us 
// to know whether the request was via http or https.
app.use (function (req, res, next) {
	if (req.secure) {
		// request was via https, so do no special handling
		next();
	} else {
		// request was via http, so redirect to https
		res.redirect('https://' + req.headers.host + req.url);
	}
});

// Allow static files in the /public directory to be served
app.use(express.static(__dirname + '/public'));

// Start listening on the port
var server = app.listen(port, function() {
	console.log('Listening on port %d', server.address().port);
});