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

//======================DB MODELS COLLECTIONS TMS TIETOKANTAMALLIT=====================
var Friends = mongoose.model('friends',{
    name:String,
    address:String,
    age: {type: Number, min: 0 },
//    user:[{type:mongoose.Shcema.Types.ObjectId,ref:'user'}]
});

var User = mongoose.model('user',{
    username: {type: String, unique: true },
    password: String,
    friends:[{type:mongoose.Schema.Types.ObjectId,ref:'friends'}] //yhdellä käyttäjällä voi olla monta friendsia. 
//    friends:{}
});

//user = new User();
//user.username = "sjks";
//user.friends = new Friends({});

//======================DB EXPORTS======================================
exports.Friend = Friends;
exports.User = User;