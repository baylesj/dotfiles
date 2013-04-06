$(document).ready(function() {
  
  // kick it off
  chrome.tabs.getSelected(null, function(tab) {
    url = tab.url;
    camelizer.onLoad(url);
  });

});


var camelAsync = {
  
  get: function(url, data, callback, type) {
    type = (typeof type === 'undefined') ? 'json' : type;
    $.get(url, data, function(data, textStatus, jqXHR) {
      out = {"response":data, "status": jqXHR.status};
      callback(out);
    }, type);
  }

}

var camelizerStore = {
  
  getMulti: function(dic, callback) {
    // seems chrome can hate us here... so we'll hope we're catching something in chrome and call the callback on the default values.
    try {
      chrome.storage.sync.get(dic, function(data) {
        if (typeof data == "undefined") {
          console.log("Chrome storage get returned an undefined response! executing callback with default values.");
          callback(dic);
        } else {
          callback(data);
        }
      });
    } catch (e) {
      console.log(e.message);
      console.log(e.stack);
      callback(dic);
    }
  },

  set: function(key, val) {
    obj = {};
    obj[key] = val;
    chrome.storage.sync.set(obj, function(a) {});
  }

};

function bindChartLinks() {
  // nothing necessary in chrome
}
