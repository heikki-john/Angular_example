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

var Friends = mongoose.model('friends',{
    name:String,
    address:String,
    age: {type: Number, min: 0 },
    car: String
});

var User = mongoose.model('user',{
    username: {type: String, unique: true },
    password: String
});

var temp = new Friends();
temp.name = 'Vauva';
temp.address = 'Vastasyntynyt';
temp.age = 1;
temp.car = "Toyota";
temp.save();