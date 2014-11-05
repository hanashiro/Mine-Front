'use strict';

describe('Controller: ProdutoProdutobuscaCtrl', function () {

  // load the controller's module
  beforeEach(module('mineApp'));

  var ProdutoProdutobuscaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProdutoProdutobuscaCtrl = $controller('ProdutoProdutobuscaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
