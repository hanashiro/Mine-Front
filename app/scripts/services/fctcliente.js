'use strict';

/**
 * @ngdoc service
 * @name mineApp.FctCliente
 * @description
 * # FctCliente
 * Factory in the mineApp.
 */
angular.module('mineApp')
  .factory('FctCliente', function (FctApi) {
    var app = {
        cliente : Objetos.Cliente(),
        clientes: [],
        buscarClientes : function(busca,tipoBusca){
            var setClientes = function(resp){
                    var clientes = resp,
                    i = clientes.length;
                    if(i==0){
                        Plugins.Mensagem.aviso("Nenhum cliente encontrado");
                    }
                    while(i--){
                        clientes[i] = Utils.Moradia.Integracao.buscar(clientes[i]);
                    }
                    app.clientes = clientes;
                
            }
            var erro = function(erro){
                Plugins.Mensagem.erro("Erro ao buscar clientes");
            }
            if(tipoBusca=="nome"){
                FctApi.Cliente.buscarNome(busca,setClientes,erro);
            }else{
                FctApi.Cliente.buscarContato(busca,setClientes,erro);
            }
        },
        salvarCliente : function(){
            if(!app.cliente.id){
                FctApi.Cliente.salvar(app.cliente,
                    function(resp){
                        app.cliente = resp;
                        Plugins.Mensagem.sucesso("Cliente cadastrado com sucesso");
                    },
                    function(erro){
                        Plugins.Mensagem.erro("Erro ao cadastrar cliente");
                    }
                );
            }else{
                FctApi.Cliente.alterar(app.cliente,
                    function(){
                        Plugins.Mensagem.sucesso("Cliente salvo com sucesso");
                    },
                    function(erro){
                        Plugins.Mensagem.erro("Erro ao salvar cliente");
                    }
                );
            }
        }
    }
    return app;
  });
