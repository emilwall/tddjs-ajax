(function () {
  TestCase("NoopTest", {
    "test should define noop method": function () {
      assertFunction(tddjs.noop);
    },

    "test should return undefined": function () {
      assertUndefined(tddjs.noop());
    }
  });

  TestCase("IsLocalTest", {
    "test should define isLocal method": function () {
      assertFunction(tddjs.isLocal);
    },

    "test should return false when location is undefined": function () {
      assertFalse(tddjs.isLocal(undefined));
    },

    "test should return false when location.protocol is http": function () {
      assertFalse(tddjs.isLocal({
        protocol: "http:"
      }));
    },

    "test should return true when location.protocol is file": function () {
      assertTrue(tddjs.isLocal({
        protocol: "file:"
      }));
    },

    "test should throw error when location.protocol is undefined": function () {
      assertException(function () {
        tddjs.isLocal({
          protocol: undefined
        });
      }, "TypeError");
    }
  });

  TestCase("MyEncodeUriTest", {
    "test should define myEncodeURI method in encoding namespace": function () {
      assertFunction(tddjs.encoding.myEncodeURI);
    },

    "test should return URI encoded version of strings": function () {
      assertEquals("hej%20hopp", tddjs.encoding.myEncodeURI("hej hopp"));
    },

    "test should put object attributes as url parameters": function () {
      assertEquals("hej=hopp&hi=hello", tddjs.encoding.myEncodeURI({
        hej: "hopp",
        hi: "hello"
      }));
    }
  });
})();