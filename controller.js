'use strict';


var CODE = "";
var jobPos = angular.module('jobPos', []);

jobPos.controller('PosCtrl', ['$scope', function($scope){


  $scope.dateBeginBuilding = new Date(); //дата начала строительства
  $scope.timeBuilding = new Number();   // продолжительность строительства
  $scope.arrMonth = new Array();



  $scope.clickTable = function ($event){

    if ($event.target.localName !== "td" ) {
      return false;
    }
    // console.log($event.target.innerHTML);
    $event.target.innerHTML='<input type="text" class="form-control" onblur="tableInputBlur(value)" id="edit" value='+$event.target.innerHTML+'>';
    document.getElementById("edit").focus(); 
    // console.log($scope.dateBeginBuilding);

  };



  $scope.removeTask = function (key, value){

 // dd = "qqqqqqqqqqqqq";   
 console.log(key);
 console.log(value);
 console.log("dfdsdfdfd");
  };





  $scope.users = [
  { name: "Подготовка территории", age: [{me:'age'},{me:'age2'}], location: 'Nagpur' },
  { name: "Подготовка территории", age: [{me:'age'},{me:'age2'}], location: 'Chennai' },
  ];


  $scope.table = new Array();





  function tableRow (arr) {
   this.name = "dd";
   this.total = "";
   this.CMP = "";
   for (var i = 0; i < arr.length; i++) {
    this[arr[i]] = "";
    console.log(arr[i]);
  } 
}



//   $scope.updateHero = function(hero, prop, value) {
//     // hero[prop] = value;
// console.log('heroheroheroheroheroheroheroherohero');

//   };










//    function table(obj) {
//     let arrayObj = [];
//     arrayObj.push(obj);
//     return arrayObj;
//   }

// var cell = function (Month,value) {
//   this.Month = Month;
//   this.value = value;
// };

//   function tableRow(arr) {
//     let arrMonth = [];
//     for (var i = 0; i < arr.length; i++) {
//           arrMonth[i] = cell(arr[i],0);
//         }
//     let name = "Подготовка территории";
//     return {
//       name : name,
//       total : 0,
//       CMP : 0,
//       arrMonth : arrMonth

//     };


//   }




//   let rowtable = function (arrayMonth) {

// let arrayRowtable = new Array(); //ОЧИСТИТЬ

// let Obj = function (Month,coldspan) {
//   this.Month = Month;
//   this.coldspan = coldspan;
// };

// for (var i = 0; i < arrayMonth.length; i++) {
//   arrayMonth[i] = new Obj(arrayMonth[i],"0");
// }

// console.log(arrayRowtable);
// };





$scope.$watchGroup(['timeBuilding', 'dateBeginBuilding'], function(newValue, oldValue, scope) {
  var arrayMonth = new Array(); //ОЧИСТИТЬ

  let timeMonth = new Date($scope.dateBeginBuilding.getFullYear(), $scope.dateBeginBuilding.getMonth(), 1, 0, 0, 0, 0);
  let num = $scope.dateBeginBuilding.getMonth();

  for (var i = 0; i < parseInt($scope.timeBuilding); i++) {

    if(num == 13) {
      num = 1;
    }

    timeMonth.setMonth(num++);
    arrayMonth[i] = timeMonth.toString().substring(4,7);
  }




  $scope.row = new tableRow(arrayMonth);
  $scope.table.push($scope.row);

  // console.log($scope.tableGlav);
  
});


$scope.change = function (){
  console.log("$scope.rowsdddddddddddddddddddd");
}





$scope.$watch('row', function(newValue, oldValue, scope) {
   console.log("$scope.rowaaaaaaaaaaa");
});

 $scope.last = function ($event){



console.log($scope.table[0]);
let elem = $scope.table[0];
elem.name = "dasdadadadsasda";

 }






}]);


 var updateHero = function(hero, prop, value) {
    // hero[prop] = value;
console.log('heroheroheroheroheroheroheroherohero');
console.log(value);
  };


function tableInputBlur(value) {
   document.getElementById("edit").offsetParent.innerHTML = value;
   updateHero('hero',"",value);
}





// $scope.changeMonth = function (){

//   $scope.tableMonth = new Array(); //ОЧИСТИТЬ
//   $scope.tableYears = new Array();

//   let timeContinie = parseInt($scope.timeBuilding);
//   let Year = $scope.dateBeginBuilding.getFullYear();
//   let timeMonth = new Date(Year, $scope.dateBeginBuilding.getMonth(), 1, 0, 0, 0, 0);
//   let num = $scope.dateBeginBuilding.getMonth();


//   let count = 0;
//   let Obj = function (year, coldspan) {
//     this.year = year;
//     this.coldspan = coldspan;
//   };

//   for (var i = 0; i < timeContinie; i++) {

//     if(num == 13){
//       num = 1;
//     }

//     timeMonth.setMonth(num++);

//     $scope.tableMonth[i] = timeMonth.toString().substring(4,7);
//     let yearNext = timeMonth.toString().substring(11,15);

//     if (Year == yearNext) {
//       count++;
//     }else{  
//       $scope.tableYears.push(new Obj(Year,count));
//       Year = yearNext; 
//       count = 1;
//     }
//   }

//   $scope.tableYears.push(new Obj(Year,count));





// // ///проценты делим 100 на колво месяцев
// // setTimeout(function () {
// //   let elemlist = document.getElementsByClassName("tablePercent");
// //   for (var item of elemlist) {
// //    item.innerHTML = (100/elemlist.length).toFixed(2);
// //  }

// // }, 100);




// function resultLastCellTable(arr, result) {

//   for (var i = 0; i < arr.length - 1; i++) {
//     result = result - arr[i].innerHTML;
//   //  result = result - parseInt(arr[i].innerHTML);
// }

// arr[arr.length - 1].innerHTML = result;
//   //return result;
// }




// function keyPressKeyboard(e) {
//   let char = e.key;
//   if (char == "Enter") {
//     // document.getElementById("edit").onblur();
//   }
// }






