(function () {
  var ajax = tddjs.ajax;

  function forceStatusAndReadyState(xhr, url, status, rs) {
    var success = stubFn();
    var failure = stubFn();

    ajax.get(url, {
      success: success,
      failure: failure
    });

    xhr.status = status;
    xhr.readyStateChange(rs);

    return {
      success: success.called,
      failure: failure.called
    };
  }

  function setUp() {
    this.tddjsIsLocal = tddjs.isLocal;
    this.ajaxCreate = ajax.create;
    this.xhr = Object.create(fakeXMLHttpRequest);
    ajax.create = stubFn(this.xhr);
    this.tddjsMyEncodeURI = tddjs.encoding.myEncodeURI;
  }

  function tearDown() {
    tddjs.isLocal = this.tddjsIsLocal;
    ajax.create = this.ajaxCreate;
    tddjs.encoding.myEncodeURI = this.tddjsMyEncodeURI;
  }

  TestCase("GetRequestTest", {
    setUp: setUp,

    tearDown: tearDown,

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
      ajax.get("/url");
      assert(ajax.create.called);
    },

    "test should call open with method, url, async flag": function () {
      var url = "/url";
      ajax.get(url);

      assertEquals(["GET", url, true], this.xhr.open.args);
    },

    "test should add onreadystatechange handler": function () {
      ajax.get("/url");

      assertFunction(this.xhr.onreadystatechange);
    },

    "test should call send": function () {
      ajax.get("/url");

      assert(this.xhr.send.called);
    },

    "test should not throw error without success handler": function () {
      this.xhr.readyState = 4;
      this.xhr.status = 200;

      ajax.get("/url");

      assertNoException(function () {
        this.xhr.onreadystatechange();
      }.bind(this));
    },

    "test should pass argument to send in order to work with firefox 3.0.x and older": function () {
      var arguments;

      ajax.get("/url");
      arguments = this.xhr.send.args;

      assertNotUndefined(arguments[0]);
    },

    "test should not make changes to options passed as parameter": function () {
      var options = {};
      ajax.get("/uri", options);

      assertEquals({}, options);
    }
  });

  TestCase("ReadyStateHandlerTest", {
    setUp: setUp,

    tearDown: tearDown,

    "test should call success handler for status 200":
    function () {
      var request = forceStatusAndReadyState(this.xhr, "/url", 200, 4);

      assert(request.success);
    },

    "test should reset onreadystatechange when complete in order to avoid memory leak in Internet Explorer":
    function () {
      this.xhr.readyState = 4;
      ajax.get("/url");

      this.xhr.onreadystatechange();

      assertSame(tddjs.noop, this.xhr.onreadystatechange);
    },

    "test should call success handler for local requests":
    function () {
      var request;

      tddjs.isLocal = stubFn(true);
      request = forceStatusAndReadyState(this.xhr, "file.html", 0, 4);

      assert(request.success);
    }
  });

  TestCase("RequestTest", {
    setUp: setUp,
    tearDown: tearDown,

    "test should use specified request method": function () {
      ajax.request("/uri", { method: "POST" });

      assertEquals("POST", this.xhr.open.args[0]);
    },

    "test should encode data": function () {
      tddjs.encoding.myEncodeURI = stubFn();
      var urlParams = { field1: "13", field2: "Lots of data!" };

      ajax.request("/url", { data: urlParams, method: "POST" });

      assertSame(urlParams, tddjs.encoding.myEncodeURI.args[0]);
    }
  });

  TestCase("PostRequestTest", {
    setUp: function () {
      this.ajaxRequest = ajax.request;
    },

    tearDown: function () {
      ajax.request = this.ajaxRequest;
    },

    "test should call request with POST method": function () {
      ajax.request = stubFn();

      ajax.post("/url");

      assertEquals("POST", ajax.request.args[1].method);
    }
  });
}());
