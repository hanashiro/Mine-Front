'use strict';

describe('Service: FctLogin', function () {

  // load the service's module
  beforeEach(module('mineApp'));

  // instantiate service
  var FctLogin;
  beforeEach(inject(function (_FctLogin_) {
    FctLogin = _FctLogin_;
  }));

  it('should do something', function () {
    expect(!!FctLogin).toBe(true);
  });

});
