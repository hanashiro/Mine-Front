'use strict';

describe('Service: FctCliente', function () {

  // load the service's module
  beforeEach(module('mineApp'));

  // instantiate service
  var FctCliente;
  beforeEach(inject(function (_FctCliente_) {
    FctCliente = _FctCliente_;
  }));

  it('should do something', function () {
    expect(!!FctCliente).toBe(true);
  });

});
