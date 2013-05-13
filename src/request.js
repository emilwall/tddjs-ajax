(function () {
  var ajax = tddjs.namespace("ajax");

  if (!ajax.create) {
    return;
  }

  function requestComplete(transport, options) {
    if (transport.status == 200) {
      options.success(transport);
    }
  }

  function get(url, options) {
    if (typeof url != "string") {
      throw new TypeError("URL should be string");
    }

    var transport = ajax.create();
    transport.open("GET", url, true);

    transport.onreadystatechange = function () {
      if (transport.readyState == 4) {
        requestComplete(transport, options);
      }
    };

    transport.send();
  }

  ajax.get = get;
}());
