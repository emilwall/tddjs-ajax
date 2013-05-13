function stubFn() {
  var fn = function () {
    fn.called = true;
  };

  fn.called = false;

  return fn;
}
