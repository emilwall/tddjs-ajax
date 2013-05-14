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
})();