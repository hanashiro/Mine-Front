'use strict';

/**
 * @ngdoc service
 * @name mineApp.FctApi
 * @description
 * # FctApi
 * Factory in the mineApp.
 */var TesteAPI;
angular.module('mineApp')
  .factory('FctApi', function ($http) {
    var url = 'http://localhost:8080/Mine/';
    var api = (function(){
        return{
            get : function(endp,sucesso,erro){
                $http({
                    method: 'GET', 
                    url: url+endp,
                    responseType: 'json',
                    headers: {
                        "Authorization": "Bearer "+localStorage["userToken"]
                    }
                })
                .success(sucesso)
                .error(erro);
            },
            post : function(endp,obj,sucesso,erro){
                $http({
                    method: 'POST', 
                    url: url+endp,
                    data: JSON.stringify(obj),
                    responseType : 'json',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage["userToken"]
                    }
                })
                .success(sucesso)
                .error(erro);
            },
            put : function(endp, obj, sucesso, erro){
                $http({
                    method: 'PUT', 
                    url: url+endp,
                    data: JSON.stringify(obj),
                    responseType : 'json',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage["userToken"]
                    }
                })
                .success(sucesso)
                .error(erro);
            },
            del : function(endp, id, sucesso, erro){
                $http({
                    method: 'DELETE', 
                    url: url+endp,
                    responseType: 'json',
                    "Authorization": "Bearer " + localStorage["userToken"]
                })
                .success(sucesso)
                .error(erro);
            }
        }
    })();
    var app = {
        Categoria : (function(){
            return{
                buscar : function(id,sucesso,erro){
                    api.get('categoria/'+id,sucesso,erro);
                },
                buscarTodos : function(sucesso,erro){
                    api.get('categoria',sucesso,erro);
                },
                salvar : function(obj,sucesso,erro){
                    api.post('categoria',obj,sucesso,erro);
                },
                alterar : function(obj,sucesso,erro){
                    api.put('categoria',obj,sucesso,erro);
                },
                deletar : function(id,sucesso,erro){
                    api.del('categoria',id,sucesso,erro);
                }
            }
        })(),
        Cliente : (function(){
            return{
                buscar : function(id,sucesso,erro){
                    api.get('cliente/'+id,sucesso,erro);
                },
                buscarTodos : function(sucesso,erro){
                    api.get('cliente/',sucesso,erro);
                },
                buscarNome : function(nome, sucesso, erro){
                    api.get('cliente/nome/'+nome,sucesso,erro);
                },
                buscarContato : function(contato, sucesso, erro){
                    api.get('cliente/telefone/'+contato,sucesso,erro)
                },
                salvar : function(obj,sucesso,erro){
                    obj = Utils.Moradia.Integracao.salvar(obj);
                    api.post('cliente',obj,sucesso,erro);
                },
                alterar : function(obj,sucesso,erro){
                    obj = Utils.Moradia.Integracao.salvar(obj);
                    api.put('cliente',obj,sucesso,erro);
                },
                deletar : function(id,sucesso,erro){
                    api.del('cliente',id,sucesso,erro);
                }
            }
        })(),
        Fornecedor : (function(){
            return{
                buscar : function(id,sucesso,erro){
                    api.get('fornecedor/'+id,sucesso,erro);
                },
                buscarTodos : function(sucesso,erro){
                    api.get('fornecedor',sucesso,erro);
                },
                buscarNome : function(nome, sucesso, erro){
                    api.get('fornecedor/nome/'+nome,sucesso,erro);
                },
                buscarContato: function (contato, sucesso, erro) {
                    api.get('fornecedor/contato/' + contato, sucesso, erro);
                },
                salvar : function(obj,sucesso,erro){
                    obj = Utils.Moradia.Integracao.salvar(obj);
                    api.post('fornecedor',obj,sucesso,erro);
                },
                alterar : function(obj,sucesso,erro){
                    obj = Utils.Moradia.Integracao.salvar(obj);
                    api.put('fornecedor',obj,sucesso,erro);
                },
                deletar : function(id,sucesso,erro){
                    api.del('fornecedor',id,sucesso,erro);
                }
            }
        })(),
        Login : (function(){
            return{
                login : function(token,sucesso,erro){
                    api.post('login/', {TokenValue:token},sucesso,erro);
                },
                logout: function (sucesso, erro) {
                    api.get('login', function (a) { console.log(a) }, function (a) { console.log(a) })
                }
            }
        })(),
        Produto : (function(){
            return{
                buscar : function(id,sucesso,erro){
                    api.get('produto/'+id,sucesso,erro);
                },
                buscarNome : function(nome, sucesso, erro){
                    api.get('produto/nome/'+nome,sucesso,erro);
                },
                buscarCodigoBarras: function (codBarras, sucesso, erro) {
                    api.get('produto/cdbarras/' + codBarras, sucesso, erro);
                },
                buscarTodos : function(sucesso,erro){
                    api.get('produto',sucesso,erro);
                },
                salvar : function(obj,sucesso,erro){
                    api.post('produto',obj,sucesso,erro);
                },
                alterar : function(obj,sucesso,erro){
                    api.put('produto',obj,sucesso,erro);
                },
                deletar : function(id,sucesso,erro){
                    api.del('produto',id,sucesso,erro);
                }
            }
        })()
    };TesteAPI = app;
    return app;
  });
