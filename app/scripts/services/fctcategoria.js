'use strict';

/**
 * @ngdoc service
 * @name mineApp.FctCategoria
 * @description
 * # FctCategoria
 * Factory in the mineApp.
 */
angular.module('mineApp')
  .factory('FctCategoria', function (FctApi) {
    
    return {
      cadastrar: function(categoria, callback){
        FctApi.Categoria.salvar(categoria,callback,callback);
      },
      alterar: function(categoria, callback){
        FctApi.Categoria.alterar(categoria,callback,callback);
      },
      listar: function(callback){
        FctApi.Categoria.buscarTodos(callback,callback);
      }
    };
  });
