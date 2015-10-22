var mongoose = require('mongoose');

var uri = 'mongodb://localhost:27017/person';

mongoose.connect(uri, function(bad, good){
   if (bad) {
    console.log("NOT connected to db..." + bad.message);
   }
    else{
        console.log("Connected to DB");
    }
    
});