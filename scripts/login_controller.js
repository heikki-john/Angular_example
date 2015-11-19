//Controller for login.html temlate
my_module.controller('loginController', function($scope, $resource, $location){
    
    $scope.login = {};
    
    $scope.login.login = function(){
        var loginData = {
            username:$scope.login.username,
            password:$scope.login.password
        }
        
        var req = $resource('/user', {}, {'post':{method:'POST'}});
        req.post(loginData).$promise.then(function(data){
            
            //if login was ok
            if(data.status === "Ok"){
                
                $location.path('/main');
            }
            else{
                $(".error").text(data.status); //htmlään errorin teksti tästä
            }
                
        });
    }
    
    $scope.login.register = function(){
        var loginData = {
            username:$scope.login.username,
            password:$scope.login.password
        }
        
        var req = $resource('/user/register', {}, {'post':{method:'POST'}});
        req.post(loginData).$promise.then(function(data){
            
            //if login was ok
            if(data.status === "Ok"){
                
                $(".error").text("Register Success. You can now login!"); //htmlään errorin teksti tästä
            }
            else{
                $(".error").text(data.status); //htmlään errorin teksti tästä
            }
                
        });
    
    }
});