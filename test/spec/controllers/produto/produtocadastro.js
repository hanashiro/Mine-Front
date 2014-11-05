'use strict';

describe('Controller: ProdutoProdutocadastroCtrl', function () {

  // load the controller's module
  beforeEach(module('mineApp'));

  var ProdutoProdutocadastroCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProdutoProdutocadastroCtrl = $controller('ProdutoProdutocadastroCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
