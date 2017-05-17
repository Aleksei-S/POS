'use strict';



var jobPos = angular.module('jobPos', []);

jobPos.controller('PosCtrl', ['$scope', function($scope){


$scope.dateBeginBuilding = new Date(); //дата начала строительства
$scope.timeBuilding = new Number(); // продолжительность строительства
$scope.table = new Array();
$scope.arrayMonth = new Array();
$scope.arrayYearsColdspan = new Array();


// Клик по таблице Row
$scope.clickTableRow = function ($event, Row, key, value){
  let valueHide=value;
  this.value="";
  this.showInput = true;
  setTimeout(function () {
    var elem = document.getElementById("edit");
    elem.focus();
    elem.value = valueHide;
  },100);
};


//выход из инпута
$scope.inputTableBlur = function (){
  this.inputValue = document.getElementById("edit").value;
  this.$parent.showInput = false;
  this.$parent.$parent.Row[this.$parent.key] = this.inputValue;
  this.$parent.value = this.inputValue;
  console.log(this.$parent.$parent.Row);
};


// function tableRow (arr, name="", total="0", CMP="0") {
//   this.name = name;
//   this.total = total;
//   this.CMP = CMP;
//   for (var i = 0; i < arr.length; i++) {
//     this[arr[i]] = "";
//   } 
// }


$scope.$watchGroup(['timeBuilding', 'dateBeginBuilding'], function(newValue, oldValue, scope) {
  console.log($scope.table +'        $scope.table ');
  $scope.arrayMonth =  Array(); //ОЧИСТИТЬ
  $scope.arrayYearsColdspan =  Array();
  $scope.table = [];               //ОЧИСТИТЬ  !!!!!!!!!!!!!!!!!NONONONO
  let timeMonth = new Date($scope.dateBeginBuilding.getFullYear(), $scope.dateBeginBuilding.getMonth(), 1, 0, 0, 0, 0);
  let num = $scope.dateBeginBuilding.getMonth();
  let Year = $scope.dateBeginBuilding.getFullYear();
  let countColdspan = 0;
  let Obj = function (year, coldspan) {
    this.year = year;
    this.coldspan = coldspan;
  };

  for (var i = 0; i < parseInt($scope.timeBuilding); i++) {

    if(num == 13) {
      num = 1;
    }
    timeMonth.setMonth(num++);
    $scope.arrayMonth[i] = timeMonth.toString().substring(4,7);
    let yearNext = timeMonth.toString().substring(11,15);
    if (Year == yearNext) {
      countColdspan++;
    }else{ 
      $scope.arrayYearsColdspan.push(new Obj(Year,countColdspan));
      Year = yearNext; 
      countColdspan = 1;
    }
  }
  $scope.arrayYearsColdspan.push(new Obj(Year,countColdspan));
  $scope.createTable($scope.arrayMonth);
});









$scope.createTable = function (arrayMonth){
  $scope.row = new tableRow($scope.arrayMonth);
  $scope.table.push($scope.row);
  $scope.row = new tableRow($scope.arrayMonth);
  $scope.table.push($scope.row);

  ////////////////////ПРОЦЕНТЫ////////////////////////
  $scope.row = new tableRow(arrayMonth, "Распределение капвложений по месяцам", "100%", "100%");
  $scope.table.push($scope.row);

$scope.$watch('row', function(newValue, oldValue, scope) {
  console.log(newValue+'        this.newValue');
  console.log(newValue+'        this.oldValue');
});

}





function tableRow (arr, name="", total="0", CMP="0") {
  this.name = name;
  this.total = total;
  this.CMP = CMP;
  for (var i = 0; i < arr.length; i++) {
    this[arr[i]+i] = "";
  } 
}



// $scope.$watch('row', function(newValue, oldValue, scope) {
//   console.log(newValue+'        this.newValue');
//   console.log(newValue+'        this.oldValue');
// });


$scope.last = function (){
  $scope.table.pop();
}







}]);









// let rowtable = function (arrayMonth) {

// let arrayRowtable = new Array(); //ОЧИСТИТЬ

// let Obj = function (Month,coldspan) {
// this.Month = Month;
// this.coldspan = coldspan;
// };

// for (var i = 0; i < arrayMonth.length; i++) {
// arrayMonth[i] = new Obj(arrayMonth[i],"0");
// }

// console.log(arrayRowtable);
// };









// $scope.changeMonth = function (){

// $scope.tableMonth = new Array(); //ОЧИСТИТЬ
// $scope.tableYears = new Array();

// let timeContinie = parseInt($scope.timeBuilding);
// let Year = $scope.dateBeginBuilding.getFullYear();
// let timeMonth = new Date(Year, $scope.dateBeginBuilding.getMonth(), 1, 0, 0, 0, 0);
// let num = $scope.dateBeginBuilding.getMonth();


// let count = 0;
// let Obj = function (year, coldspan) {
// this.year = year;
// this.coldspan = coldspan;
// };

// for (var i = 0; i < timeContinie; i++) {

// if(num == 13){
// num = 1;
// }

// timeMonth.setMonth(num++);

// $scope.tableMonth[i] = timeMonth.toString().substring(4,7);
// let yearNext = timeMonth.toString().substring(11,15);

// if (Year == yearNext) {
// count++;
// }else{ 
// $scope.tableYears.push(new Obj(Year,count));
// Year = yearNext; 
// count = 1;
// }
// }

// $scope.tableYears.push(new Obj(Year,count));




