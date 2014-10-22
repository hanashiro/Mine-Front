'use strict';

/**
 * @ngdoc service
 * @name mineApp.FctLogin
 * @description
 * # FctLogin
 * Factory in the mineApp.
 */
angular.module('mineApp')
  .factory('FctLogin', function (FctApi) {
    var app = {
        user: {},
        isLogged: false,
        login: function () {
            TesteAPI.Login.login(localStorage['userToken'],
                function (resp) {
                    if(resp.Status){
                        app.user = JSON.parse(resp.Objeto[0]);
                        $('#loadingDiv').fadeOut(300);
                        app.isLogged = true;
                    } else {
                        //location.href = "login.html";
                    }
                },
                function (err) {
                    console.log(err);
                    //Controle.Login.logout();
                    //location.href = "login.html";
                })
        }
    }
    return app;
  });
