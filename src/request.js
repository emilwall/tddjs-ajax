tddjs.namespace("ajax").get = function (url) {
  if (typeof url != "string") {
    throw new TypeError("URL should be string");
  }
};
