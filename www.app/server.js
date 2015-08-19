var config = require('./config.json');
var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');


// Start express application
var app = express();

// All environments
app.set('port', process.env.PORT || config.express.port);
app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.cookieParser()); 
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'securedsession' }));

// Include the controllers (routes)
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});

app.use(app.router);


//  Default route
app.get('/', function(req, res){
  res.render('index', { title: 'Express' });
});


////////////////////////////////////////////////////////////////
//  TEMP ROUTES
//
var data = require('./temp/config_MedidoresDeExito.json');
app.get('/get/data', function(req, res){
  res.send(data);
});

app.post('/set/data', function(req, res){
	fs.writeFileSync('./temp/config_MedidoresDeExito.json', JSON.stringify(req.body, null, "\t"));
	data = req.body;
	res.send(200);
});

////////////////////////////////////////////////////////////////



// Development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//
// Start de server
//
http.createServer(app).listen(app.get('port'), function(){
  console.log('Weepo server listening on port ' + app.get('port'));
});
