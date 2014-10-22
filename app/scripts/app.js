'use strict';

/**
 * @ngdoc overview
 * @name mineApp
 * @description
 * # mineApp
 *
 * Main module of the application.
 */
angular
  .module('mineApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/contador', {
        templateUrl: 'views/contador.html',
        controller: 'ContadorCtrl'
      })
      .when('/cliente/clienteBusca', {
        templateUrl: 'views/cliente/clientebusca.html',
        controller: 'ClienteClientebuscaCtrl'
      })
      .when('/cliente/clienteCadastro/:nome', {
        templateUrl: 'views/cliente/clientecadastro.html',
        controller: 'ClienteClientecadastroCtrl'
      })
      .when('/fornecedor/fornecedorBusca', {
        templateUrl: 'views/fornecedor/fornecedorbusca.html',
        controller: 'FornecedorFornecedorbuscaCtrl'
      })
      .when('/fornecedor/fornecedorCadastro/:nome', {
        templateUrl: 'views/fornecedor/fornecedorcadastro.html',
        controller: 'FornecedorFornecedorcadastroCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(['$rootScope', 'FctLogin', function($root,FctLogin) {
        
    $root.$on('$routeChangeStart', function (event, next, current) {
      if(!FctLogin.isLogged){
          FctLogin.login();
      }
    });
        

    $root.$on('$routeChangeSuccess', function(e, curr, prev) {
      switch (curr.loadedTemplateUrl) {
          case "views/main.html":
              $('.div_location').html('');
          break;
          case "views/cliente/clientebusca.html" :
              $('.div_location').html('Cliente <i class="fa fa-arrow-right"></i> Busca');
          break;
          case "views/cliente/clientecadastro.html" :
              $('.div_location').html('Cliente <i class="fa fa-arrow-right"></i> Cadastro');
          break;
          case "views/contador.html" :
              $('.div_location').html('Contador');
          break;
          case "views/fornecedor/fornecedorbusca.html" :
              $('.div_location').html('Fornecedor <i class="fa fa-arrow-right"></i> Busca');
          break;
          case "views/fornecedor/fornecedorcadastro.html" :
              $('.div_location').html('Fornecedor <i class="fa fa-arrow-right"></i> Cadastro');
          break;
      }
    });
  }]);
