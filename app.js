var express = require('express'); //tämä moduuli pitää asentaa erikseen
var bodyParser = require('body-parser');
var path = require('path'); //ei tarvi asentaa erikseen kun kuuluu node pakettiin
var session = require('express-session'); // Ladataan session moduli käyttöön
var example = require('./app_modules/example'); //ladataan oma moduuli app_modules hakemistosta
var database = require('./app_modules/database');
var friend_rest = require('./app_modules/friends_rest');
var user = require('./app_modules/login');

var app = express();

//session middleware käyttöön.Luo session cookien (joten voi käyttää req.session). Tässä konfiguroinnit  esim. session kesto
app.use(session({secret:'yoursecrettokenhere'}));

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
app.use('/css', express.static(path.join(__dirname, 'css')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented:true}));

app.use('/friend', friend_rest); //Middleware ehtii eli routtaa haluttuun rest funktioon moduulissa friends_rest tms.

app.use('/user', user)

//========================================ROUTERS============================================


app.listen(3000);