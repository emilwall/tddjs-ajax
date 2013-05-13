function stubFn(returnValue) {
  var fn = function () {
    fn.called = true;
    return returnValue;
  };

  fn.called = false;

  return fn;
}
