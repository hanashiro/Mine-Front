'use strict';

/**
 * @ngdoc function
 * @name mineApp.controller:ProdutoProdutocadastroCtrl
 * @description
 * # ProdutoProdutocadastroCtrl
 * Controller of the mineApp
 */
angular.module('mineApp')
  .controller('ProdutoProdutocadastroCtrl', function ($scope, $routeParams, FctProduto, FctObjReader) {
    $scope.Produto = FctProduto;

    
	if($routeParams.nome=="novo_produto"){
        $scope.Produto.produto = Objetos.Produto();
    }

    FctObjReader.Objects.totalRead = [];
    FctObjReader.Objects.ignoreRead = [];
    FctObjReader.Objects.includeRead = [];

        
    
    $scope.salvar = function () {
        if (FctObjReader.calc()==1) {
            FctProduto.salvarProduto();
        } else {
            Plugins.Mensagem.aviso("Preencha todos os campos obrigat&oacute;rios!")
        }
    }

    $scope.novoCadastro = function(){
        $scope.Produto.produto = Objetos.Produto();
    }

    

  });
