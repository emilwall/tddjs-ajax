TestCase("GetRequestTest", {
  "test should define get method": function () {
    assertFunction(tddjs.ajax.get);
  },

  "test should throw error without url": function () {
    assertException(function () {
      tddjs.ajax.get();
    }, "TypeError");
  },

  "test should not throw error when given url": function () {
    assertNoException(function () {
      tddjs.ajax.get("www.tddjs.com");
    });
  }
});
