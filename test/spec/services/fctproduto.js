'use strict';

describe('Service: fctproduto', function () {

  // load the service's module
  beforeEach(module('mineApp'));

  // instantiate service
  var fctproduto;
  beforeEach(inject(function (_fctproduto_) {
    fctproduto = _fctproduto_;
  }));

  it('should do something', function () {
    expect(!!fctproduto).toBe(true);
  });

});
