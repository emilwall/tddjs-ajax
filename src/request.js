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

  function setData(options) {
    if (options.data) {
      if (tddjs.encoding &&
          typeof tddjs.encoding.myEncodeURI === "function") {
        options.data = tddjs.encoding.myEncodeURI(options.data);
      }
      if (options.method == "GET") {
        options.url += "?" + options.data;
        options.data = null;
      }
    } else {
      options.data = null;
    }
  }

  function request(url, options) {
    if (typeof url != "string") {
      throw new TypeError("URL should be string");
    }

    options = tddjs.extend({}, options);
    options.url = url;
    setData(options);

    var transport = ajax.create();
    transport.open(options.method || "GET", options.url, true);

    transport.onreadystatechange = function () {
      if (transport.readyState === 4) {
        requestComplete(transport, options);
        transport.onreadystatechange = tddjs.noop;
      }
    };

    transport.send(options.data);
  }

  ajax.request = request;

  function delegateRequest(url, options, method) {
    options = tddjs.extend({}, options);
    options.method = method;
    ajax.request(url, options);
  }

  function get(url, options) {
    delegateRequest(url, options, "GET");
  }

  ajax.get = get;

  function post(url, options) {
    delegateRequest(url, options, "POST");
  }

  ajax.post = post;
}());
