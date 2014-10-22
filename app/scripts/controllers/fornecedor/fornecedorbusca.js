'use strict';

/**
 * @ngdoc function
 * @name mineApp.controller:FornecedorFornecedorbuscaCtrl
 * @description
 * # FornecedorFornecedorbuscaCtrl
 * Controller of the mineApp
 */
angular.module('mineApp')
  .controller('FornecedorFornecedorbuscaCtrl', 
  function ($scope,$location,FctFornecedor) {
    $scope.Fornecedor = FctFornecedor;
    
    
    $scope.buscaNome = "";

    /******* FUNCOES *******/
    $scope.buscar = function(){
        $scope.Fornecedor.buscarFornecedores($scope.buscaNome, $scope.tipoBusca());
    }

    $scope.travarCampo = function (event) {
        if ($scope.tipoBusca() == "telefone") {
            Utils.Mascaras.numerosTeclado(event);
        }
    }

    $scope.mascararBusca = function (e) {
        if ($scope.tipoBusca() == "telefone") {
            var busca = Utils.Mascaras.addTel($scope.buscaNome);
            $scope.buscaNome = busca.substring(0, 15);
        }
    }

    $scope.tipoBusca = function () {
        var busca = $scope.buscaNome;
        if (!isNaN(parseInt(busca, 10)) || busca.indexOf('(') != -1 || busca.indexOf(')') != -1 && busca.indexOf('@') == -1) {
            busca = busca.replace(/\(/gi, '');
            busca = busca.replace(/\)/gi, '');
            if (!isNaN(parseInt(busca, 10))) {
                return "telefone";
            }
            return "email";
        }
        if (busca.indexOf('@') != -1) {
            return "email";
        }
        return "nome";
    }

    $scope.selecionarFornecedor = function(fornecedor){
        $scope.Fornecedor.fornecedor = fornecedor;
    }

    $scope.editarFornecedor = function(fornecedor){
        $scope.Fornecedor.cliente = fornecedor;
        $location.url('fornecedor/fornecedorCadastro/'+fornecedor.Nome);
    }

    $scope.deletar = function(fornecedor){
        
    }
  });
