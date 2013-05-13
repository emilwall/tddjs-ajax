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
    },

    "test should obtain an XMLHttpRequest object": function () {
      var originalCreate = ajax.create;

      ajax.create = function () {
        ajax.create.called = true;
      };

      ajax.get("/url");

      assert(ajax.create.called);

      ajax.create = originalCreate;
    }
  });
}());
