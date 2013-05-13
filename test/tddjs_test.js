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
    }
  });
})();