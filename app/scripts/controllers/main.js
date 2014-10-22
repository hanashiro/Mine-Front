'use strict';

/**
 * @ngdoc function
 * @name mineApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mineApp
 */
angular.module('mineApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
