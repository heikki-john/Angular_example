var friends = require('./database');

//this funtion add new friend to database
exports.addFriend = function(req,res){
    
}

//this funtion update friend to database
exports.updateFriend = function(req,res){
    
}

//this funtion delete friend from database
exports.deleteFriend = function(req,res){
    
}

//this funtion gets all friends from database
exports.getAllFriends = function(req,res){
    friends.Friend.find(function(err,data){
        if(err){
            res.send('Something went wrong');
        }
        else{
            res.send(data);
        }
    });
}




