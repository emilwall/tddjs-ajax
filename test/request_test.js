TestCase("GetRequestTest", {
  "test should define get method": function () {
    assertFunction(tddjs.ajax.get);
  },

  "test should throw error without url": function () {
    assertException(function () {
      tddjs.ajax.get();
    }, "TypeError");
  }
});
