'use strict';

describe('Service: FctCategoria', function () {

  // load the service's module
  beforeEach(module('mineApp'));

  // instantiate service
  var FctCategoria;
  beforeEach(inject(function (_FctCategoria_) {
    FctCategoria = _FctCategoria_;
  }));

  it('should do something', function () {
    expect(!!FctCategoria).toBe(true);
  });

});
