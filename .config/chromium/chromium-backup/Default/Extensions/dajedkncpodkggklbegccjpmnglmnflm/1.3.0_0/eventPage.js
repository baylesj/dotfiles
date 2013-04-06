// Copyright 2012 Google Inc. All Rights Reserved.

/**
 * Search-by-Image Chrome extension event page.
 * @author howardzhou@google.com (Howard Zhou)
 */

/**
 * Chrome extension request handler.
 * Handles all requests from other parts of this extension.
 * @param {object} request The request sent by other parts of the ext.
 * @param {object} sender The sender of the request.
 * @param {object} callback The callback of this request.
 */
function onRequest(request, sender, callback) {
  switch (request.action) {
    case 'savePreview':
      localStorage['imagePreview'] = request.image;
      break;
    case 'getPreview':
      callback(localStorage['imagePreview']);
      break;
    case 'sbiSearch':
      // Perform Search-by-Image for the specific URL and open a new tab to the
      // right of the current tab to display the search result. If
      // request.selected is true, select/highlight the result tab. Otherwise,
      // stay on the current tab.
      chrome.tabs.query({'active': true,
                         'lastFocusedWindow': true }, function(tab) {
        chrome.tabs.create({'url': request.url,
                            'index': tab[0].index + 1,
                            'selected': request.selected });
      });
      break;
    case 'selectCurrentTab':
      // Select/highlight the current tab.
      chrome.tabs.query({'active': true,
                         'lastFocusedWindow': true }, function(tab) {
        chrome.tabs.highlight({'tabs': tab[0].index }, function() {});
      });
      break;
  }
}

// Add the onRequest function as the listener.
chrome.extension.onRequest.addListener(onRequest);
