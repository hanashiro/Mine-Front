'use strict';

describe('Controller: FornecedorFornecedorcadastroCtrl', function () {

  // load the controller's module
  beforeEach(module('mineApp'));

  var FornecedorFornecedorcadastroCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FornecedorFornecedorcadastroCtrl = $controller('FornecedorFornecedorcadastroCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
