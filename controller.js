'use strict';







var jobPos = angular.module('jobPos', []);

jobPos.controller('PosCtrl', ['$scope', function($scope){


$scope.timeBuilding = "";

 $scope.Kalendarnii = function ($event){
 console.log($event.target.value);
 refreshTableKalendarnii($event.target.value);
    };
  


function refreshTableKalendarnii (t) {
 $scope.timeBuilding = t;  
  console.log($scope.timeBuilding);
}






$scope.clickTable = function ($event){
 console.log($event);

    };

$scope.changeMonth = function (){
 console.log('$event');

    };







}]);





















