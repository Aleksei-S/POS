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
  //checkRow (this.$parent.$parent.Row);
  console.log(this.$parent.$parent.Row);
};


$scope.$watch('table', function(newValue, oldValue, scope) {
 if (newValue == oldValue) return;
    //  console.log(newValue);
    // console.log(scope);
    //  console.log("scope222");
  }, true);




// function checkRow (tablerow) {
//   let result = tablerow.total;
//   let num = $scope.arrayMonth.length - 1;
//   for (var i = 0; i < num; i++) {
//     result = result - tablerow[$scope.arrayMonth[i]];
//   }

//   tablerow[$scope.arrayMonth[num]] = result;

//   console.log(result);
//   console.log($scope.arrayMonth);
//   console.log($scope.arrayMonth.length);
// }








function tableRow (arr, name="", total="0", CMP="0") {
  this.name = name;
  this.total = total;
  this.CMP = CMP;
  for (var i = 0; i < arr.length; i++) {
    this[arr[i]] = "";
  } 
}


$scope.$watchGroup(['timeBuilding', 'dateBeginBuilding'], function(newValue, oldValue, scope) {
  let oldTable = $scope.table;   //save old
  $scope.arrayMonth =  Array(); //ОЧИСТИТЬ
  $scope.arrayYearsColdspan =  Array(); //ОЧИСТИТЬ
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

  $scope.createTable(oldTable);
});



$scope.addRow = function (){
  $scope.table.splice(0, 0, new tableRow($scope.arrayMonth));
};

$scope.deleteRow = function (index){
 $scope.table.splice(index, 1);
};

$scope.switchRow = function (index, str){
 let row = $scope.table[index];
 let num = "";

 if (str == "up") {
  num = index - 1;
} else {
  num = index + 1;
}

if (-1 < num && num < ($scope.table.length - 1)) {
  $scope.table.splice(index, 1,  $scope.table[num]);
  $scope.table.splice(num, 1,  row);
}

};






$scope.createTable = function (oldTable){
  if (oldTable.length == 0) {
   $scope.table.push(new tableRow($scope.arrayMonth));
   $scope.table.push(new tableRow($scope.arrayMonth));
  ////////////////////ПРОЦЕНТЫ////////////////////////
  let row = new tableRow($scope.arrayMonth, "Распределение капвложений по месяцам", "100%", "100%");
  $scope.table.push(row);
  } else {
    for (var i = 0; i < oldTable.length; i++) {
    $scope.table.push(new tableRow($scope.arrayMonth, oldTable[i].name,oldTable[i].total,oldTable[i].CMP));
    }
  }
}









$scope.last = function (){


}









}]);












