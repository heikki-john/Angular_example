var express = require('express'); //tämä moduuli pitää asentaa erikseen
var path = require('path'); //ei tarvi asentaa erikseen kun kuuluu node pakettiin
var example = require('./app_modules/example'); //ladataan oma moduuli app_modules hakemistosta
var database = require('./app_modules/database');
var friends_rest = require('./app_modules/friend_rest');
var app = express();


//Middleware AINA ennen router functioita
//Middleware otetaan käyttöön use-komennolla
//this is my middleware
app.use(function(req,res,next){
    example.doSomething();
    console.log(req.path);
    console.log(req.method);
    next(); //Next antaa mennä requestin eteen päin. eli selain ei jää odotus looppiin
});

//hanskataan staattiset tiedostot Middlewareilla
app.use(express.static(path.join(__dirname, 'views'))); // Tässä pyyntö root folderiin, voisi kirjoittaa myös .use('/', ...)
app.use('/lib', express.static(path.join(__dirname, 'lib')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

app.use(friends_rest, '/friend'); //Middleware ehtii eli routtaa haluttuun rest funktioon moduulissa friends_rest tms.


//========================================ROUTERS============================================
app.get('/persons', function (req, res) {
  res.send("you ask persons");
});

/*
app.get('/hello', function (req, res) {
  res.send('Hello NodeJS');
})
*/

app.listen(3000);