'use strict';

/**
 * @ngdoc function
 * @name mineApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the mineApp
 */
angular.module('mineApp')
  .controller('HeaderCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
