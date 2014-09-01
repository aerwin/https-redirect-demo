/* Copyright IBM Corp. 2014 All Rights Reserved                      */

var express = require('express');
var app = express();

var port = (process.env.VCAP_APP_PORT || 3000);

app.enable('trust proxy');

app.use (function (req, res, next) {
	if (req.secure) {
		next();
	} else {
		res.redirect('https://' + req.headers.host + req.url);
	}
});

app.use(express.static(__dirname + '/public'));

var server = app.listen(port, function() {
	console.log('Listening on port %d', server.address().port);
});