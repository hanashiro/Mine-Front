'use strict';

describe('Controller: ContadorCtrl', function () {

  // load the controller's module
  beforeEach(module('mineApp'));

  var ContadorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContadorCtrl = $controller('ContadorCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
