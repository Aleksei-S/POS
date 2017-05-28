'use strict';



var jobPos = angular.module('jobPos', []);

jobPos.controller('PosCtrl', ['$scope', function($scope){

  $scope.numberApart = 81;
  $scope.numberKPD = 19;

  $scope.STRtable = new Array("Подготовка территории строительства",
    ""+$scope.numberApart+" квартирный жилой дом (КПД-"+$scope.numberKPD+")"
    ,"Наружные сети(подключение)"
    ,"Временные здания и сооружения"
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
    if ($scope.valueCheck(value)) { ////////////// наверно неправ
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
  watchTable(this.$parent.$parent.Row, this.$parent.key);
    // console.log(this.$parent.$parent.Row);
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

function objValue (first="0", second = "0") {
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

if (-1 < num && num < ($scope.table.length)) {
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
  checkRowPercent(this.$parent.$parent.arrayMonth);
  refreshTable ();
};

function checkRowPercent (arrayMonth) {
  let result = 100;
  for (var i = 0; i < arrayMonth.length-1; i++) {
    result = result - arrayMonth[i].value;
  }
  arrayMonth[arrayMonth.length-1].value = result;
}
///////////////FOR PERCENT




function watchTable(row, key) {
  if (key == "total" || key == "CMP") {
    refreshTable ();
  } else {
    refreshLastValueTable (row);
  }
}

//расчет последнего месяца
function refreshLastValueTable (row) {
let arr = [];
arr = arr.concat($scope.rowCalculatePercent, $scope.rowCalculateLastMonth, $scope.rowCalculateFirstAndLastMonth);
  
  if (checkRowCalculate(row, arr)) {
   calculateLastMonthTable(row);
   calculateOther ();
  }
}

//расчет последнего месяца продолжение
function calculateLastMonthTable (row) {
   let result = []; 
   let val = lastANDfirstKey(row)[1];
   result[0] = row.total;
   result[1] = row.CMP;

    for (var key in row){
      if (key == "name" || key == "total" || key == "CMP"  || key == val) {
      continue; 
      }
      result[0] = result[0] - row[key].first;
      result[1] = result[1] - row[key].second;
    }

   row[val].first = result[0];
   row[val].second = result[1];
}


function calculateOther () {
  let other;
  let totalRow;

  for (var i = 0; i < $scope.table.length; i++){
    if (($scope.table[i].name).indexOf('Прочие работы') !== -1 ) {
      other = $scope.table[i];
    }
    if (($scope.table[i].name).indexOf('В С Е Г О:') !== -1 ) {
      totalRow = $scope.table[i];
    }
  }

  for (var key in other) {
    let result = [];

    if (key == "name") {
      continue; 
    }

    if (key == "total" || key == "CMP") {
      result[0] = totalRow[key];
    } else {
      result[0] = totalRow[key].first;
      result[1] = totalRow[key].second;
    }

    for (var i = 0; i < $scope.table.length; i++){
      
      if (($scope.table[i].name).indexOf('В С Е Г О:') !== -1 || ($scope.table[i].name).indexOf('Прочие работы') !== -1) {
        continue; 
      }
      
      if (key == "total" || key == "CMP") {
        result[0] = result[0] - $scope.table[i][key];
      } else {
        result[0] = result[0] - $scope.table[i][key].first;
        result[1] = result[1] - $scope.table[i][key].second;
      }
    }

    if (key == "total" || key == "CMP") {
      other[key] =  result[0];
    } else {
      other[key].first = result[0];
      other[key].second = result[1];
    }
  }
calculateLastMonthTable (other);
}



$scope.rowCalculatePercent = ["В С Е Г О:", "квартирный жилой"];
$scope.rowCalculateLastMonth = ["сети"];
$scope.rowCalculateFirstMonth = ["Подготовка"];
$scope.rowCalculateFirstAndLastMonth = ["Временные здания"];
//как считать строки
function checkRowCalculate (row, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (row.name.indexOf(arr[i]) !== -1) {
      return true;
    } else {
      continue;
    }
  }
  return false;
}


//ВЫЧИСЛЕНИЕ!!!!!!!!!!!!!
function refreshTable () {

  //каждой строки в табице кроме прочие
  for (var i = 0; i < $scope.table.length; i++){
    if (($scope.table[i].name).indexOf('Прочие работы') !== -1 ) {
      continue;
    }
    // проценты расчет
    if ($scope.table[i].total !== "0" && checkRowCalculate($scope.table[i], $scope.rowCalculatePercent)) {
      calculatePercentRow($scope.table[i]);
      continue;
    }
    // расчет последний месяц
    if ($scope.table[i].total !== "0" && checkRowCalculate($scope.table[i], $scope.rowCalculateLastMonth)) {
      calculateLastMonth($scope.table[i]);
      continue;
    }
   // расчет первый месяц
    if ($scope.table[i].total !== "0" && checkRowCalculate($scope.table[i], $scope.rowCalculateFirstMonth)) {
      calculateFirstMonth($scope.table[i]);
      continue;
    }
    // расчет первый и последний месяц
    if ($scope.table[i].total !== "0" && checkRowCalculate($scope.table[i], $scope.rowCalculateFirstAndLastMonth)) {
      calculateFirstAndLastMonth($scope.table[i]);
      continue;
    }
  }
calculateOther();
}

 // проценты расчет
function calculatePercentRow (row) {
  let count = 0;
  for (var key in row) {
    if (key == "name" || key == "total" || key == "CMP") {
     continue; 
    }
    row[key].first = row.total * $scope.arrayMonth[count].value / 100;
    row[key].first =+ row[key].first.toFixed(2);

    row[key].second = row.CMP * $scope.arrayMonth[count].value / 100;
    row[key].second =+ row[key].second.toFixed(2);
    count++;
  } 
}

// расчет последний месяц
function calculateLastMonth (row) {
  let val = lastANDfirstKey(row)[1];
  row[val].first = row.total;
  row[val].second = row.CMP;
}

// расчет первый месяц
function calculateFirstMonth (row) {
  let val = lastANDfirstKey(row)[0];
  row[val].first = row.total;
  row[val].second = row.CMP;
}

// расчет первый и последний месяц
function calculateFirstAndLastMonth (row) {
  let val = lastANDfirstKey(row);
  row[val[0]].first = row.total * 0.8;
  row[val[0]].second = row.CMP * 0.8;
  row[val[1]].first = row.total * 0.2;
  row[val[1]].second = row.CMP * 0.2;
}


function lastANDfirstKey(row){
let keys = new Array(2)
let valFirst = "";
let valLast = "";
  for (var key in row) {
    if ($scope.valueCheck(row[key]) && valFirst == "") {
      valFirst = key;
    } 
     valLast = key;
  } 
  keys[0] = valFirst;
  keys[1] = valLast;
return keys;
}




// function replaceOnNumber () {
//   for (var i = 0; i < $scope.table.length; i++){
//     for (var key in $scope.table) {
//       if ($scope.table[key] == "-") {
//         $scope.table[key] = "0";
//       }
//     }
//   }
// }

// function replaceOnMinus () {
//   for (var i = 0; i < $scope.table.length; i++){
//     for (var key in $scope.table) {
//       if ($scope.table[key] == "0") {
//         $scope.table[key] = "-";
//       }
//     }
//   }
// }










$scope.last = function (){

}









}]);












