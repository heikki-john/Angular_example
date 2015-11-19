//this is our first module
var my_module = angular.module("root_module",['ngRoute', 'ngResource']);

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
    
    personFactory.getData().then(function(data){
        $scope.person.data = data;
    });
    
    $scope.person.addPerson = function(){
        console.log('You pressed save!');
        var tempData = {
            name: $scope.person.name,
            address: $scope.person.address,
            age: $scope.person.age
        };
        
        //$scope.person.data.push(tempData); //alla factroryyn tallentaminen
        personFactory.addData(tempData).then(function(data){
            console.log(data);
        });
    };
    
    $scope.person.deletePerson = function(id){
        
        //tällä rivillä saadaan näytöstä ilman refressiä poistettua
        for(var i = 0; i < $scope.person.data.length; i++)
            {
                // === estää javascriptiä tekemään tyyppimuunnoksen
                if($scope.person.data[i]._id === id){
                    $scope.person.data.splice(i,1);
                    break;
                }
            }
        
        personFactory.deleteData(id).then(function(result){
            console.log(result);            
        });
    };
    
});

//Create a factrory. Factory is singleton, meaning there is only one instance of it.
//jotta factoryn saa käyttöön controllerissa niin täytyy se laittaa kontrollorein parametriksi
my_module.factory('personFactory', function($resource){
    var my_factory = {};
    my_factory.data = [];
    
    my_factory.addData = function(person){
        //my_factory.data.push(person);   
        var req = $resource('/friend', {},{'post':{method:'POST'}});
        return req.post(person).$promise;
    }
    
    my_factory.getData = function(){
        var req = $resource('/friend', {}, {'get': {method:'GET'}}); // {'get': {method:'GET'}} voi olla pelkästään myös {} toimii silti
        
        return req.query().$promise;
    }
    
    my_factory.deleteData = function(id){
        var req = $resource('/friend/',{_id:id},{'delete':{method: 'DELETE'}});
        return req.delete().$promise;
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





