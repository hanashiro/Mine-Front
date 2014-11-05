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


    var prod1 = Objetos.Produto();
    prod1.nome = "Refrigerante Uva";
    prod1.id = 5;
    prod1.precoEntrada = 2.50;
    prod1.precoSaida = 3.95;
    prod1.codigoBarras = 987565113351;
    prod1.quantidade = 43;
    prod1.estoqueMinimo = 10;
    prod1.descricao = '';
    var prod2 = angular.copy(prod1);
    var prod3 = angular.copy(prod1);
    var prod4 = angular.copy(prod1);
    prod2.nome = "Refrigerante Limão";
    prod3.nome = "Refrigerante Laranja";
    prod4.nome = "Refrigerante Cola";

    FctProduto.produtos.push(prod1,prod2,prod3,prod4);
    FctProduto.produto = prod4;





  });
