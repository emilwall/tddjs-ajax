(function () {
  var ajax = tddjs.namespace("ajax");

  if (!ajax.create) {
    return;
  }

  function requestComplete(transport, options) {
    var status = transport.status,
        success = options.success;

    if (status == 200 || (tddjs.isLocal() && !status)) {
      if (typeof success == "function") {
        success(transport);
      }
    }
  }

  function get(url, options) {
    if (typeof url != "string") {
      throw new TypeError("URL should be string");
    }

    options = options || {};
    var transport = ajax.create();
    transport.open("GET", url, true);

    transport.onreadystatechange = function () {
      if (transport.readyState == 4) {
        requestComplete(transport, options);
        transport.onreadystatechange = tddjs.noop;
      }
    };

    transport.send(null);
  }

  ajax.get = get;
}());
