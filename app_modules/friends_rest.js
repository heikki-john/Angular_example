var express = require('express');
var friends = require('./friends');

var router = express.Router();


//=========REST API for Friends collections ===============
router.get('/', function(req,res){
    friends.getAllFriends(req,res);
});

router.post('/', function(req,res){
    console.log(req.body);
    friends.addFriend(req,res);
});

router.put('/', function(req,res){

});

router.delete('/', function(req,res){
    friends.deleteFriend(req,res);
});

module.exports = router;