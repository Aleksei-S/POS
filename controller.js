'use strict';



var jobPos = angular.module('jobPos', []);

jobPos.controller('PosCtrl', ['$scope', function($scope){



  var numberApart = 81;
  var numberKPD = 19;

  $scope.STRtable = new Array("Подготовка территории строительства",
    ""+numberApart+" квартирный жилой дом (КПД-"+numberKPD+")"
    ,"Наружные сети(подключение)"
    , "Прочие работы и лимитированные затраты", "В С Е Г О:" ); 
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
    if ($scope.valueCheck(value)) { //////////////
      elem.value = valueHide.first + "\n" + valueHide.second;   ////////////
    } else {
      elem.value = valueHide;
    }
  },100);
};


//выход из инпута
$scope.inputTableBlur = function (){
  this.inputValue = document.getElementById("edit").value;
  this.$parent.showInput = false;

    if ($scope.valueCheck(this.$parent.$parent.Row[this.$parent.key])) {   //////////////
      let valElement = this.inputValue.split('\n');
      this.$parent.$parent.Row[this.$parent.key].first = valElement[0];
      this.$parent.$parent.Row[this.$parent.key].second = valElement[1];
      this.$parent.value = this.$parent.$parent.Row[this.$parent.key];
    } else {

      this.$parent.$parent.Row[this.$parent.key] = this.inputValue;
      this.$parent.value = this.inputValue;
    }
    checkTable ();
    console.log(this.$parent.$parent.Row);
  };

// $scope.keybord = function (e){
//   if (e.charCode = 13) {
//     console.log("fggg");
//   }
// };



$scope.valueCheck = function (val) {
  if(val instanceof objValue === true) {
    return true;
  }
  return false;
}

function objValue (first="11", second = "11") {
  this.first = first;
  this.second = second;
}




function tableRow (arr, name="", total="0", CMP="0") {
  this.name = name;
  this.total = total;
  this.CMP = CMP;
  for (var i = 0; i < arr.length; i++) {
    this[arr[i]+i] = new objValue();
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
  let ObjMonth = function (Month, value) {
    this.Month = Month;
    this.value = value;
  };

  for (var i = 0; i < parseInt($scope.timeBuilding); i++) {

    if(num == 13) {
      num = 1;
    }
    timeMonth.setMonth(num++);
    //$scope.arrayMonth.push(timeMonth.toString().substring(4,7));
    $scope.arrayMonth.push(new ObjMonth(timeMonth.toString().substring(4,7),(100/$scope.timeBuilding).toFixed(0)));
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




$scope.addRow = function (name){
  $scope.table.splice(0, 0, new tableRow($scope.arrayMonth, name));
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
    for (var i = 0; i < $scope.STRtable.length; i++) {
      $scope.table.push(new tableRow($scope.arrayMonth, $scope.STRtable[i]));
    }
  } else {
    for (var i = 0; i < oldTable.length; i++) {
      $scope.table.push(new tableRow($scope.arrayMonth, oldTable[i].name,oldTable[i].total,oldTable[i].CMP));
    }
  }
}

///////////////FOR PERCENT
$scope.clickPercent = function ($event, MonthObj){
  let valueHide = MonthObj.value;
  this.Month.value=""; 
  this.showInput = true;
  setTimeout(function () {
    var elem = document.getElementById("edit");
    elem.focus();
    elem.value = valueHide;
  },100);
}
$scope.inputPercentBlur = function (){
  this.$parent.showInput = false;
  this.$parent.Month.value = document.getElementById("edit").value;
  checkRow(this.$parent.$parent.arrayMonth);

};
function checkRow (arrayMonth) {
  let result = 100;
  for (var i = 0; i < arrayMonth.length-1; i++) {
    result = result - arrayMonth[i].value;
  }
  arrayMonth[arrayMonth.length-1].value = result;
}
///////////////FOR PERCENT




function checkTable () {
  let total = "";
  let other = "";
  let rowArr = [];
  for (var i = 0; i < $scope.table.length; i++) {
    if (($scope.table[i].name).indexOf('В С Е Г О:') !== -1 ) {
      total = $scope.table[i];
    } else if (($scope.table[i].name).indexOf('Прочие работы') !== -1 ) {
      other = $scope.table[i];
    } else {
      rowArr.push($scope.table[i]);
    }
  }
  calculateOther (total, other, rowArr);

  // let ff="Прочие работы Подготовка территории";
  // console.log(ff.indexOf('Прочие работы'));
  // console.log($scope.table);
}


function calculateOther (total, other, rowArr) {

  for (var key in other) {
    if (key == "name") {
     continue;
    }
    checkOnNumber();
    for (var i = 0; i < rowArr.length; i++) {
     other[key] = total[key] - rowArr[i][key];
    }
  }
}


function checkOnNumber (val) {
  return true;
}



//Подготовка территории 
//жилой дом
//сети
//Прочие работы






$scope.last = function (){

}









}]);












