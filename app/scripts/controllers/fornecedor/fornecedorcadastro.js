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
        [$scope.Fornecedor.fornecedor, ['NomeFantasia']],
        [$scope.Fornecedor.fornecedor.Endereco, ['TipoLogradouro', 'Logradouro', 'Numero', 'Bairro', 'Estado', 'Cidade']]
    ];
        
    $scope.estados = Colecao.Estados;
    $scope.tipoEmail = Colecao.tiposEmail;
    $scope.tipoTelefone = Colecao.tiposTelefone;
    $scope.tipoLogradouro = Colecao.tiposLogradouro;
    $scope.cidades = Utils.Moradia.retornarCidade($scope.Fornecedor.fornecedor.Endereco.Estado.Key);
    $scope.telefone = Objetos.Contato();
    $scope.email = Objetos.Contato();

    /******* FUNCOES *******/
    $scope.retornarCidades = function(){
        $scope.cidades = Utils.Moradia.retornarCidade($scope.Fornecedor.fornecedor.Endereco.Estado.Key);
        $scope.Fornecedor.fornecedor.Endereco.Cidade = {};
    }


    $scope.setEstadoCidade = function(){
        //Controle.setEstadoCidade($scope);
    }

    $scope.novoContato = function(categoria){
        var tipoContato = "";
        if(categoria=="Telefone"){
            if($scope.telefone.Contato.length<14){
                Plugins.Mensagem.erro("Número Inválido!")
                return false;
            }
            tipoContato = "telefone";
        }else if(categoria=="Email"){
            if($scope.email.Contato.length<7){
                Plugins.Mensagem.erro("Email Inválido!")
                return false;
            }
            tipoContato = "email";
        }
        if($scope[tipoContato].Tipo.Key==0 || $scope[tipoContato].Tipo==""){
            Plugins.Mensagem.aviso("Selecione um tipo de "+tipoContato+"!")
            return false;
        }
        $scope[tipoContato].Categoria = categoria;
        $scope[tipoContato].Tipo = $scope[tipoContato].Tipo.Value;
        $scope.Fornecedor.fornecedor.Contato.push($scope[tipoContato]);
        $scope[tipoContato] = Objetos.Contato();
        $scope[tipoContato].Tipo = $scope["tipo"+categoria][0];
    }

    $scope.apagarContato = function(index){
        $scope.Fornecedor.fornecedor.Contato.splice(index,1);
    }

    $scope.salvar = function(){
        if (FctObjReader.calc() == 1 && $scope.Fornecedor.fornecedor.Endereco.TipoLogradouro.Key != 0) {
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
