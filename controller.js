'use strict';


var code = "";  // изначальныйкод в ячейки табицы
var value = ""; //каендарный план передача значение




var jobPos = angular.module('jobPos', []);

jobPos.controller('PosCtrl', ['$scope', function($scope){

  $scope.dateBeginBuilding = new Date(); //дата начала строительства
  $scope.timeBuilding = new Number();   // продолжительность строительства

  //---------календарный план таблица 
  $scope.tableMonth = new Array();
  $scope.tableYears = new Array();
  

  console.log($scope.timeBuilding);

  $scope.Kalendarnii = function ($event){
   console.log($event.target.value);
   refreshTableKalendarnii($event.target.value);
 };




 function refreshTableKalendarnii (t) {
   $scope.timeBuilding = t;  
   console.log($scope.timeBuilding);
 }








// angular.element($rootElement);




// console.log(angular.element($rootElement));
console.log(document.getElementById("number-1"));





console.log($scope);




//---------календарный план таблица CLICK
$scope.clickTable = function ($event){
  console.log(document.getElementById("number-0"));
  if ($event.target.localName !== "td" ) {
    console.log('return');
    return false;
  }
  code = $event.target;
  console.log(code);
  $event.target.outerHTML = '<input type="text" onkeypress="return keyPressKeyboard(event)" onblur="tableBlur()" id="edit" value='+code.innerHTML+' />';
  document.getElementById("edit").focus(); 
// <td ng-repeat="Month in tableMonth track by $index" class="ng-scope">9898$$</td>
};




$scope.changeMonth = function (){

  $scope.tableMonth = new Array(); //ОЧИСТИТЬ
  $scope.tableYears = new Array();

  let timeContinie = parseInt($scope.timeBuilding);
  let Year = $scope.dateBeginBuilding.getFullYear();
  let timeMonth = new Date(Year, $scope.dateBeginBuilding.getMonth(), 1, 0, 0, 0, 0);
  let num = $scope.dateBeginBuilding.getMonth();


  let count = 0;
  let Obj = function (year, coldspan) {
    this.year = year;
    this.coldspan = coldspan;
  };

  for (var i = 0; i < timeContinie; i++) {

    if(num == 13){
      num = 1;
    }

    timeMonth.setMonth(num++);

    $scope.tableMonth[i] = timeMonth.toString().substring(4,7);
    let yearNext = timeMonth.toString().substring(11,15);

    if (Year == yearNext) {
      count++;
    }else{  
      $scope.tableYears.push(new Obj(Year,count));
      Year = yearNext; 
      count = 1;
    }
  }
  $scope.tableYears.push(new Obj(Year,count));

  console.log($scope.tableYears);
  console.log($scope.tableMonth);
}








$scope.last = function ($event){

$scope.tableMonth.forEach( function(element, index) {

let elem = document.getElementById("number-"+index);
console.log(elem);

console.log(index);


//    let elem=getElementById("number-"+index); 

// console.log(elem);
   });




//   angular.array.forEach( function($scope.tableMonth, index) {
    
//    let elem=getElementById("number-"+index); 

// console.log(elem);
//   });

};





}]);



function tableBlur() {
  let elem = document.getElementById("edit");
  let char1 = code.outerHTML.indexOf(">");
  let char2 = code.outerHTML.indexOf("</td>");
  elem.outerHTML = code.outerHTML.substring(0, char1+1) + elem.value + code.outerHTML.substring(char2);
}


function keyPressKeyboard(e) {
  let char = e.key;
  if (char == "Enter") {
    // document.getElementById("edit").onblur();
  }
}












