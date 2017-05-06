'use strict';

var jobPos = angular.module('jobPos', []);

jobPos.controller('PosCtrl', ['$scope', function($scope){

  $scope.dateBeginBuilding = new Date(); //дата начала строительства
  $scope.timeBuilding = new Number();   // продолжительность строительства

  //---------календарный план таблица 
  $scope.tableMonth = new Array();
  $scope.tableYears = new Array({year:2014, colm:4});


  console.log($scope.timeBuilding);



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
   let timeContinie = parseInt($scope.timeBuilding);
   let Year = $scope.dateBeginBuilding.getFullYear();
   let timeMonth = new Date(Year, $scope.dateBeginBuilding.getMonth(), 1, 0, 0, 0, 0);
   let num = $scope.dateBeginBuilding.getMonth();
   let Year2 = "";
   let count = 1;
   for (var i = 0; i < timeContinie; i++) {

    if(num == 13){
      num = 1;
    }

    timeMonth.setMonth(num++);
    $scope.tableMonth[i] = timeMonth.toString().substring(3,7);
    let Year = timeMonth.toString().substring(10,15);

    if (Year !== Year2) {
      Year2 = Year;

    } else if (Year == Year2) {
     count++; 
    }

    console.log(timeMonth);
  }
  console.log($scope.tableMonth);
};







}]);





















