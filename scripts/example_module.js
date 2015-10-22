//this is our first module
var my_module = angular.module("root_module",['ngRoute']);

//After creating module you can add controllers, factories etc for it...

//Configure routes
my_module.config(function($routeProvider){
    $routeProvider.when('/',{
        controller:'personController',
        templateUrl:'view1.html'
    }).when('/friends',{
        controller:'personController',
        templateUrl:'view2.html'
    }).when('/about',{
        templateUrl:'view3.html'
    }).otherwise({
        redirectTo:'/'
    });
});


//Tämä tapa on suojattu minimointipakkaustyökalua vastaan 
/*
my_module.controller('personController', ['$scope', function($scope){ 
    
}]);
*/
//tämä tapa ei ole suojattu minimointipakkaustyökalua vastaan
my_module.controller('personController', function($scope, personFactory /*,  personService */){
    $scope.person = {};
   // $scope.person.data = []; //muutos kun factroysta otetaan data, muutettu rivi alla
    $scope.person.data = personFactory.getData();
    $scope.person.addPerson = function(){
        console.log('You pressed save!');
        var tempData = {
            name: $scope.person.name,
            address: $scope.person.address,
            age: $scope.person.age
        };
        
        //$scope.person.data.push(tempData); //alla factroryyn tallentaminen
        personFactory.addData(tempData);

    };
    
});

//Create a factrory. Factory is singleton, meaning there is only one instance of it.
//jotta factoryn saa käyttöön controllerissa niin täytyy se laittaa kontrollorein parametriksi
my_module.factory('personFactory', function(){
    var my_factory = {};
    my_factory.data = [];
    
    my_factory.addData = function(person){
        my_factory.data.push(person);   
    }
    
    my_factory.getData = function(){
        return my_factory.data;
    }
    
    return my_factory; //Factoryn pitää aina palauttaa factory objekti, muuten se ei toimi
});

/* service . ota käyttöön controllerissa */
/*
my_module.service('personService', function()){
    this.name = "heikki";
    this.doSomething = function(){
        console.log("Hello world");   
    }
}
*/





