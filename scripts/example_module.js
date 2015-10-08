//this is our first module
var my_module = angular.module("root_module",[]);

//After creating module you can add controllers, factories etc for it...

//Tämä tapa on suojattu minimointipakkaustyökalua vastaan 
/*
my_module.controller('personController', ['$scope', function($scope){ 
    
}]);
*/
//tämä tapa ei ole suojattu minimointipakkaustyökalua vastaan
my_module.controller('personController', function(){});