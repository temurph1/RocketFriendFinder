var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dust = require('dustjs-helpers');
var dustjsmorehelpers = require('dustjs-more-helpers');
var cons = require('consolidate');
var request = require('request');
var cheerio = require('cheerio');
titles = [];

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
// Assign Dust Engine to .dust files
app.engine('dust', cons.dust);

// Set Default Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function(){
	scrape();
	console.log("Server listening on port 3000");
});

function scrape(){

    request('http://www.reddit.com/r/RocketLeagueFriends/', function(err, resp, body){
  if (!err && resp.statusCode == 200){

    var $ = cheerio.load(body);
    /*
    $('a.title', '#siteTable').each(function(){
      var html = $(this).html()
      var link = "http://www.reddit.com" + $(this).attr("href");
      var region = html.substring(getPosition(html, "[", 2)+1, getPosition(html, "]", 2)).toUpperCase();
      var platform = html.substring(getPosition(html, "[", 1)+1, getPosition(html, "]", 1)).toUpperCase();
      var message = html.substring(getPosition(html, "]", 2)+1);

      if (swapRegionAndPlatform(region, platform)){
        var temp = platform;
        platform = region;
        region = temp;
      }
      if (message.length > 0){
        titles.push({"link": link, "region": region, "platform": platform, "message": message});
      }
    });

    */

    $('.thing', '#siteTable').each(function(){

      var time = $(this).children('.entry').children('.tagline').children('time').text()
      var html = $(this).children('.entry').children('.title').children('a.title').html();

      var link = "http://www.reddit.com" + $(this).children('.entry').children('.title').children('a.title').attr("href");
      var region = html.substring(getPosition(html, "[", 2)+1, getPosition(html, "]", 2)).toUpperCase();
      var platform = html.substring(getPosition(html, "[", 1)+1, getPosition(html, "]", 1)).toUpperCase();
      var message = html.substring(getPosition(html, "]", 2)+1);

      if (swapRegionAndPlatform(region, platform)){
        var temp = platform;
        platform = region;
        region = temp;
      }
      if (message.length > 0){
        titles.push({"link": link, "region": region, "platform": platform, "message": message, "time": time});
      }


    });

  }
  });

}

function getPosition(string, subString, index) {
   return string.split(subString, index).join(subString).length;
}

function swapRegionAndPlatform(region, platform){

  if (region.toUpperCase() == ("XB1") || region.toUpperCase() == ("XBOX") || region.toUpperCase() == ("PS4") || region.toUpperCase() == ("STEAM") || region.toUpperCase() == ("PC")){
    return true;
  }

  return false;
}

module.exports = app;

