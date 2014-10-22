'use strict';

describe('Service: FctApi', function () {

  // load the service's module
  beforeEach(module('mineApp'));

  // instantiate service
  var FctApi;
  beforeEach(inject(function (_FctApi_) {
    FctApi = _FctApi_;
  }));

  it('should do something', function () {
    expect(!!FctApi).toBe(true);
  });

});
