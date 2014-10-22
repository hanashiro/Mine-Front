'use strict';

describe('Controller: FornecedorFornecedorbuscaCtrl', function () {

  // load the controller's module
  beforeEach(module('mineApp'));

  var FornecedorFornecedorbuscaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FornecedorFornecedorbuscaCtrl = $controller('FornecedorFornecedorbuscaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
