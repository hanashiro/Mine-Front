'use strict';

describe('Controller: ClienteClientebuscaCtrl', function () {

  // load the controller's module
  beforeEach(module('mineApp'));

  var ClienteClientebuscaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClienteClientebuscaCtrl = $controller('ClienteClientebuscaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
