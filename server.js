var express = require('express'),
    less = require('less-middleware'),
    routes = require('./routes'),
    path = require('path');

var app = express();
var __public_dirname = path.join(__dirname, 'public');

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use('/public', less({src: __public_dirname}));
    app.use('/public', express.static(__public_dirname));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);

app.listen(app.get('port'), function() {
    console.log('Express server listening on port', app.get('port'));
});
