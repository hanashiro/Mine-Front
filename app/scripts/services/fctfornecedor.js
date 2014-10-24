'use strict';

/**
 * @ngdoc service
 * @name mineApp.FctFornecedor
 * @description
 * # FctFornecedor
 * Factory in the mineApp.
 */
angular.module('mineApp')
  .factory('FctFornecedor', function (FctApi) {
    var app = {
        fornecedor : Objetos.Fornecedor(),
        fornecedores: [],
        buscarFornecedores : function(busca, tipoBusca){
            var setFornecedores = function (resp) {
                if (resp.Status) {
                    var fornecedores = resp,
                    i = fornecedores.length;
                    if (i == 0) {
                        Plugins.Mensagem.aviso("Nenhum fornecedor encontrado");
                    }
                    while (i--) {
                        fornecedores[i] = Utils.Moradia.Integracao.buscar(fornecedores[i]);
                    }
                    app.fornecedores = fornecedores;
                }
            }
            var erro = function (erro) {
                Plugins.Mensagem.erro("Erro ao buscar fornecedores");
            }
            if (tipoBusca == "nome") {
                FctApi.Fornecedor.buscarNome(busca, setFornecedores, erro);
            } else {
                FctApi.Fornecedor.buscarContato(busca, setFornecedores, erro);
            }
        },
        salvarFornecedor : function(){
            if(!app.fornecedor.id){
                FctApi.Fornecedor.salvar(app.fornecedor,
                    function(resp){
                        app.fornecedor = resp;
                        Plugins.Mensagem.sucesso("Fornecedor cadastrado com sucesso");
                    },
                    function(erro){
                        Plugins.Mensagem.erro("Erro ao cadastrar fornecedor");
                    }
                );
            }else{
                FctApi.Fornecedor.alterar(app.fornecedor,
                    function(){
                        Plugins.Mensagem.sucesso("Fornecedor salvo com sucesso");
                    },
                    function(erro){
                        Plugins.Mensagem.erro("Erro ao salvar fornecedor");
                    }
                );
            }
        }
    }
    return app;
  });
