'use strict';

/**
 * @ngdoc function
 * @name mineApp.controller:ProdutoProdutocadastroCtrl
 * @description
 * # ProdutoProdutocadastroCtrl
 * Controller of the mineApp
 */
angular.module('mineApp')
  .controller('ProdutoProdutocadastroCtrl', function ($scope, $routeParams, FctProduto, FctCategoria, FctObjReader) {
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

    

    $scope.Categorias = {
        list : [],
        Modal : {
            open : function(){
                this.show = true;
                $("#categoriaCadastro").dialog({
                    title: "Cadastro de Categorias",
                    position: { my: "center", at: "center", of: window },
                    width: 500,
                    height: 500,
                    resizable: false,
                    draggable: false,
                    modal: true,
                    show: { effect: "drop", duration: 800 },
                    hide: { effect: "drop", duration: 1000 },
                    close: function (event, ui) {
                        $scope.Categorias.Modal.show = false;
                    },
                });
            },
            close : function(){
                this.show = false;
            },
            show : false
        },
        cadastrar : function(){
            if(this.novaCategoria.nome != ""){
                FctCategoria.cadastrar($scope.Categorias.novaCategoria,function(novaCategoria){
                    if(novaCategoria.id){
                        $scope.Categorias.list.push(novaCategoria);
                        $scope.Categorias.novaCategoria = {nome : "", ativo: true};
                        FctProduto.produto.categoria = novaCategoria;
                        Plugins.Mensagem.sucesso("Categoria cadastrada com sucesso");
                    }else{
                        Plugins.Mensagem.erro("Erro ao cadastrar categoria");
                    }
                });
            }else{
                Plugins.Mensagem.alerta("Defina um nome para a categoria");
            }
        },
        alterar : function(categoria){
            FctCategoria.alterar(categoria,function(resp){
                console.log(resp);
            });
        },
        listar: function(){
            FctCategoria.listar(function(categorias){
                $scope.Categorias.list = categorias;
            });
        },
        novaCategoria : {nome : "", ativo: true}
    }


    $scope.Categorias.listar();
    

  });
