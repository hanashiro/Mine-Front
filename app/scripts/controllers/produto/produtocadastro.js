'use strict';

/**
 * @ngdoc function
 * @name mineApp.controller:ProdutoProdutocadastroCtrl
 * @description
 * # ProdutoProdutocadastroCtrl
 * Controller of the mineApp
 */
angular.module('mineApp')
  .controller('ProdutoProdutocadastroCtrl', function ($scope, FctProduto) {
    $scope.Produto = FctProduto;

    
  });
