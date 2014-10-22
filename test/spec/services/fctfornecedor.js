'use strict';

describe('Service: FctFornecedor', function () {

  // load the service's module
  beforeEach(module('mineApp'));

  // instantiate service
  var FctFornecedor;
  beforeEach(inject(function (_FctFornecedor_) {
    FctFornecedor = _FctFornecedor_;
  }));

  it('should do something', function () {
    expect(!!FctFornecedor).toBe(true);
  });

});
