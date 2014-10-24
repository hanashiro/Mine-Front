'use strict';

/**
 * @ngdoc function
 * @name mineApp.controller:FornecedorFornecedorcadastroCtrl
 * @description
 * # FornecedorFornecedorcadastroCtrl
 * Controller of the mineApp
 */
angular.module('mineApp')
  .controller('FornecedorFornecedorcadastroCtrl', 
  function ($scope, $routeParams, FctFornecedor, FctObjReader) {
    $scope.Fornecedor = FctFornecedor;
    
    
    if($routeParams.nome=="novo_fornecedor"){
        $scope.Fornecedor.fornecedor = Objetos.Fornecedor();
    }

    FctObjReader.Objects.totalRead = [];
    FctObjReader.Objects.ignoreRead = [];
    FctObjReader.Objects.includeRead = [
        [$scope.Fornecedor.fornecedor, ['nomeFantasia']],
        [$scope.Fornecedor.fornecedor.Endereco, ['tipoLogradouro', 'logradouro', 'numero', 'bairro', 'estado', 'cidade']]
    ];
        
    $scope.estados = Colecao.Estados;
    $scope.tipoEmail = Colecao.tiposEmail;
    $scope.tipoTelefone = Colecao.tiposTelefone;
    $scope.tipoLogradouro = Colecao.tiposLogradouro;
    $scope.cidades = Utils.Moradia.retornarCidade($scope.Fornecedor.fornecedor.endereco.estado.Key);
    $scope.telefone = Objetos.Contato();
    $scope.email = Objetos.Contato();

    /******* FUNCOES *******/
    $scope.retornarCidades = function(){
        $scope.cidades = Utils.Moradia.retornarCidade($scope.Fornecedor.fornecedor.endereco.estado.Key);
        $scope.Fornecedor.fornecedor.endereco.cidade = {};
    }


    $scope.setEstadoCidade = function(){
        //Controle.setEstadoCidade($scope);
    }

    $scope.novoContato = function(categoria){
        var tipoContato = "";
        if(categoria=="Telefone"){
            if($scope.telefone.contato.length<14){
                Plugins.Mensagem.erro("Número Inválido!")
                return false;
            }
            tipoContato = "telefone";
        }else if(categoria=="Email"){
            if($scope.email.contato.length<7){
                Plugins.Mensagem.erro("Email Inválido!")
                return false;
            }
            tipoContato = "email";
        }
        if($scope[tipoContato].tipo.Key==0 || $scope[tipoContato].tipo==""){
            Plugins.Mensagem.aviso("Selecione um tipo de "+tipoContato+"!")
            return false;
        }
        $scope[tipoContato].categoria = categoria;
        $scope[tipoContato].tipo = $scope[tipoContato].tipo.Value;
        $scope.Fornecedor.fornecedor.contato.push($scope[tipoContato]);
        $scope[tipoContato] = Objetos.Contato();
        $scope[tipoContato].tipo = $scope["tipo"+categoria][0];
    }

    $scope.apagarContato = function(index){
        $scope.Fornecedor.fornecedor.contato.splice(index,1);
    }

    $scope.salvar = function(){
        if (FctObjReader.calc() == 1 && $scope.Fornecedor.fornecedor.endereco.tipoLogradouro.Key != 0) {
            FctFornecedor.salvarFornecedor();
        } else {
            Plugins.Mensagem.aviso("Preencha todos os campos obrigat&oacute;rios!")
        }
    }

    $scope.novoCadastro = function(){
        $scope.Fornecedor.fornecedor = Objetos.Fornecedor();
    }

    $scope.gerarCoordenadas = function(){
        
    }
  });
