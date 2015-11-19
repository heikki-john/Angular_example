var friends = require('./database');

//this funtion add new friend to database
exports.addFriend = function(req,res){
    
    var temp = new friends.Friend(req.body);
    temp.save(function(err){
        if(err){
            res.send("Error saving person")
        }
        else{
            console.log("Diipadaapa");
            friends.User.update({username:req.session.username}, 
                                {$push:{'friends':temp._id}}, function(err){
                                    console.log("HAA");
                                    res.send("Ok");
                                });
        }
    });
}

//this funtion update friend to database
exports.updateFriend = function(req,res){
    
}

//this funtion delete friend from database
exports.deleteFriend = function(req,res){
    console.log(req.query._id);
    friends.Friend.remove({_id:req.query._id}, function(err){
        
        if (err) {
            res.send("delete error");        
        }
        else{
            res.send("Delete success");
        }
    });
}

//this funtion gets all friends from database
exports.getAllFriends = function(req,res){
 /*
    friends.Friend.find(function(err,data){
        if(err){
            res.send('Something went wrong');
        }
        else{
            res.send(data);
        }
    });
*/
    
    friends.User.findOne({username:req.session.username}).populate('friends').exec(function(err,data){
        if(err){
            res.send('Something went wrong');
        }
        else{
            res.send(data.friends);
        }
    });
    
}




