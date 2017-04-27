/**
 *  * Module dependencies.
 *   */
var express = require('express');
var proxy = require('http-proxy-middleware'); // require('http-proxy-middleware');

/**
 *  * Configure proxy middleware
 *   */
var jsonPlaceholderProxy = proxy({
	    target: 'http://www.example.org',
	    changeOrigin: true,             // for vhosted sites, changes host header to match to target's host
	    logLevel: 'debug'
});

var app = express();

/**
 *  * Add the proxy to express
 *   */
app.use('/users', jsonPlaceholderProxy);

app.listen(3000);

console.log('[DEMO] Server: listening on port 3000');
console.log('[DEMO] Opening: http://localhost:3000/users');

require('opn')('http://localhost:3000/users');
