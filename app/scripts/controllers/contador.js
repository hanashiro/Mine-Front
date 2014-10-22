'use strict';

/**
 * @ngdoc function
 * @name mineApp.controller:ContadorCtrl
 * @description
 * # ContadorCtrl
 * Controller of the mineApp
 */
angular.module('mineApp')
  .controller('ContadorCtrl', function ($scope) {
    $scope.dinheiro = {};
   
   $scope.total = 0;
        
   $scope.iniciar = function(){
       $scope.dinheiro.nota100 = "";
       $scope.dinheiro.nota50 = "";
       $scope.dinheiro.nota20 = "";
       $scope.dinheiro.nota10 = "";
       $scope.dinheiro.nota5 = "";
       $scope.dinheiro.nota2 = "";
       $scope.dinheiro.moeda1 = "";
       $scope.dinheiro.moeda050 = "";
       $scope.dinheiro.moeda025 = "";
       $scope.dinheiro.moeda010 = "";
       $scope.dinheiro.moeda005 = "";
   }
   
   $scope.totalDinheiro = function(){
       var total = 0;
       total += $scope.dinheiro.nota100 * 100;
       total += $scope.dinheiro.nota50  * 50;
       total += $scope.dinheiro.nota20  * 20;
       total += $scope.dinheiro.nota10  * 10;
       total += $scope.dinheiro.nota5   * 5;
       total += $scope.dinheiro.nota2   * 2;
       total += $scope.dinheiro.moeda1  * 1;
       total += $scope.dinheiro.moeda050 * 0.5;
       total += $scope.dinheiro.moeda025 * 0.25;
       total += $scope.dinheiro.moeda010 * 0.10;
       total += $scope.dinheiro.moeda005 * 0.05;
       total = total.toFixed(2);
       $scope.total = !isNaN(total) ? "R$ "+total : "Erro ao Calcular!";
       return total;
   }
   
   
   $scope.iniciar();
  });
