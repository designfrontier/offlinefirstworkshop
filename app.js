var appName = 'offline'
    , http = require('http')
    , https = require('https')

    // Standard imports go here
    , express = require('express')
    , path = require('path')
    , bodyParser = require('body-parser')
    , json = bodyParser.json
    , urlencoded = bodyParser.urlencoded
    , errorHandler = require('errorhandler')
    , helmet = require('helmet') // CSP Security library

    // Import routes here
    , routes = require('./routes')
    , built = require('./routes/built')

    // Create the express app
    , app = express();

///////////////////////////////
//  NOTE:
//  If you need more outbound connections or just want to turn this off
//  You can do so at the request level by passing in an "agent" option
//  of false.
//
//  EXAMPLE
//  var req = http.request({hostname:'www.google.com', path: '/bob', agent:false});
//  OR
//  var req = https.request({hostname:'www.google.com', path: '/bob', agent:false});
//
///////////////////////////////
//Dont's cap outbound connections
http.globalAgent.maxSockets = 9999;
https.globalAgent.maxSockets = 9999;

// all environments
app.set('port', process.env.VCAP_APP_PORT || 1337);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Body Parser for dealing with POSTs
app.use(json());
app.use(urlencoded({
  extended: true
}));

//Security stuff for kicks and giggles
app.use(helmet.xframe('deny'));
app.use(helmet.csp({
  'default-src': ["'self'", '*.ldscdn.org']
  , styleSrc: ["'self'", "'unsafe-inline'", '*.ldscdn.org']
}));
app.use(helmet.xssFilter());
app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'public')));

// Map routes here
app.use('/', routes);  // Examples only, replace with your own
app.use('/built', built); // Also an example

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
