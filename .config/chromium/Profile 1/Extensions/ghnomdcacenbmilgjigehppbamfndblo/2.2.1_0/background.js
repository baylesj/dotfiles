var first_run_url = "http://camelcamelcamel.com/camelizer/first_run?browser=chrome";

function checkForValidUrl(tabId, changeInfo, tab) {
  url = tab.url;
  if (url == first_run_url) {
    chrome.pageAction.setPopup({"tabId": tab.id, "popup": "first_run_panel.html"});
    chrome.pageAction.show(tab.id);
  } else {
    camelhump = new camelHump(url);
    camelhump.detectRetailer();
    chrome.pageAction.setPopup({"tabId": tabId, "popup": "feed.html"});
    if (camelhump.asin != null) {
      chrome.pageAction.show(tabId);
    } else if (camelhump.is_retailer){
      getAsins(camelhump, function(hump, tab) {
        if (hump.asins_ar.length > 0 && !hump.asin) {
          chrome.pageAction.show(tab.id);
        }
      });
    }
  }
}

try {
  chrome.runtime.onInstalled.addListener(function(obj) {
    if (obj.reason == "install" || obj.previousVersion.substr(0,1) == "1") {
      var tab = null;
      chrome.tabs.create({"url": first_run_url}, function(tab) {
        tab = tab;
      });
    }
  });
} catch(e) {
  // older versions of chrome don't support chrome.runtime. ignore them.
}
chrome.tabs.onUpdated.addListener(checkForValidUrl);
