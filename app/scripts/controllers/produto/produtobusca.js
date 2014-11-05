'use strict';

/**
 * @ngdoc function
 * @name mineApp.controller:ProdutoProdutobuscaCtrl
 * @description
 * # ProdutoProdutobuscaCtrl
 * Controller of the mineApp
 */
angular.module('mineApp')
  .controller('ProdutoProdutobuscaCtrl',
  function ($scope,$location,FctProduto) {
    $scope.Produto = FctProduto;

    $scope.busca = "";

    /******* FUNCOES *******/
    $scope.buscar = function(){
      $scope.Produto.buscarProdutos($scope.busca,$scope.tipoBusca());
    }

    $scope.travarCampo = function (event) {
      if($scope.tipoBusca()=="telefone"){
        Utils.Mascaras.numerosTeclado(event);
      }
    }

    $scope.tipoBusca = function () {
      var busca = $scope.busca;
      if (!isNaN(busca)){
        return "codigoBarras";
      }
      return "nome";
    }


    $scope.selecionarProduto = function(produto){
      $scope.Produto.produto= produto;
    }

    $scope.editarProduto = function(produto){
      $scope.Produto.produto = produto;
      $location.url('produto/produtoCadastro/'+produto.nome);
    }

    $scope.deletar = function(cliente){

    }


  });
