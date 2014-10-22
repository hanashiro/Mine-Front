'use strict';

describe('Service: FctObjReader', function () {

  // load the service's module
  beforeEach(module('mineApp'));

  // instantiate service
  var FctObjReader;
  beforeEach(inject(function (_FctObjReader_) {
    FctObjReader = _FctObjReader_;
  }));

  it('should do something', function () {
    expect(!!FctObjReader).toBe(true);
  });

});
