'use strict';

describe('Controller: ClienteClientecadastroCtrl', function () {

  // load the controller's module
  beforeEach(module('mineApp'));

  var ClienteClientecadastroCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClienteClientecadastroCtrl = $controller('ClienteClientecadastroCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
