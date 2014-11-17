'use strict';

/**
 * @ngdoc service
 * @name mineApp.fctproduto
 * @description
 * # fctproduto
 * Factory in the mineApp.
 */
angular.module('mineApp')
  .factory('FctProduto', function (FctApi) {
    var app = {
        produto : Objetos.Produto(),
        produtos: [],
        buscarProdutos : function(busca,tipoBusca){
            var setProdutos = function(resp){
                    var produto = resp,
                    i = produto.length;
                    if(i==0){
                        Plugins.Mensagem.aviso("Nenhum produto encontrado");
                    }

                    app.produtos = produto;
            }
            var erro = function(erro){
                Plugins.Mensagem.erro("Erro ao buscar produtos");
            }
            if(tipoBusca=="nome"){
                FctApi.Produto.buscarNome(busca,setProdutos,erro);
            }else{
                FctApi.Produto.buscarCodigoBarras(busca,setProdutos,erro);
            }
        },
        salvarProduto : function(){
            if(!app.produto.id){
                FctApi.Produto.salvar(app.produto,
                    function(resp){
                        app.produto = Objetos.Produto();
                        Plugins.Mensagem.sucesso("Produto cadastrado com sucesso");
                    },
                    function(erro){
                        Plugins.Mensagem.erro("Erro ao cadastrar produto");
                    }
                );
            }else{
                FctApi.Produto.alterar(app.produto,
                    function(){
                        Plugins.Mensagem.sucesso("Produto salvo com sucesso");
                    },
                    function(erro){
                        Plugins.Mensagem.erro("Erro ao salvar produto");
                    }
                );
            }
        }
    }
    return app;
  });
