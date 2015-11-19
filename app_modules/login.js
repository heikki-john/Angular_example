var express = require("express");
var userdb = require('./userdb');
var router = express.Router();

//Login router
router.post('/',function(req,res){
    userdb.login(req,res);
});

//Register router
router.post('/register',function(req,res){
    userdb.register(req,res);
});

module.exports = router;