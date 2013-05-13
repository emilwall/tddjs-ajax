(function () {
  var ajax = tddjs.ajax;

  TestCase("GetRequestTest", {
    "test should define get method": function () {
      assertFunction(ajax.get);
    },

    "test should throw error without url": function () {
      assertException(function () {
        ajax.get();
      }, "TypeError");
    },

    "test should not throw error when given url": function () {
      assertNoException(function () {
        ajax.get("www.tddjs.com");
      });
    }
  });
}());
