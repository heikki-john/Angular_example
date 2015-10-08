//this is our first module
var my_module = angular.module("root_module",[]);

//After creating module you can add controllers, factories etc for it...

//Tämä tapa on suojattu minimointipakkaustyökalua vastaan 
/*
my_module.controller('personController', ['$scope', function($scope){ 
    
}]);
*/
//tämä tapa ei ole suojattu minimointipakkaustyökalua vastaan
my_module.controller('personController', function($scope){
    
    $scope.person = {};
    $scope.person.some_data = "this is how data binding works!";
    $scope.person.age = 32;
 
    $.ajax({
        method: "GET",
        url: "http://localhost:28017/person/friends/",
        dataType: "jsonp",
        jsonp: "jsonp",
        //success functio jos kysely onnistuu tjs. funktiolle pari parametriä voisi olla kolmekin, ei ole pakko.
        success: function(data,status){
             $scope.$apply(function(){              // apply kertoo että data on latautunut 
                $scope.person.headers = Object.keys(data.rows[0]);
                $scope.person.actual_data = data.rows;
            });
        },
        //kysely epäonnistuu
        error: function(hrx, status, errorThrown){
            console.log(errorThrown);
        }
    });    

});