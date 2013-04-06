// Copyright 2011 Google Inc. All Rights Reserved.

/**
 * Search-by-Image Chrome extension context menu modifier.
 * Enables users to perform Search-by-Image by right clicking an image on
 * a website and selecting "Search Google with this image".
 * @author yimingli@google.com (Yiming Li)
 */

/**
 * The Search-by-Image server URL.
 * @const
 */
var SERVER = 'www.google.com';

/**
 * Intermediate server URL.
 * @const
 */
var INTERMEDIATE_SERVER = 'images.google.com/imghp?sbi=1';

/**
 * The version parameter name for the Chrome extension.
 * @const
 */
var CHROME_EXTENSION_VERSION_PARAMETER_NAME = 'sbisrc';

/**
 * The version string for the Chrome extension.
 * @const
 */
var CHROME_EXTENSION_VERSION = 'cr_1_3_0';

/**
 * Callback function for creating a new tab, where inline images can be
 * searched.
 * @param {object} tab The new tab information.
 */
function newTabCallback(tab) {
  var src = localStorage['imagePreview'];
  var base64Offset = src.indexOf(',');
  var inlineImage = src.substring(base64Offset + 1)
      .replace(/\+/g, '-').replace(/\//g, '_')
      .replace(/\./g, '=');
  var injectJavascriptCode =
      /**
       * Add the key value pair as a parameter to the form.
       * @param {object} form The form being added.
       * @param {string} key The key of the parameter being added.
       * @param {string} value The value of the parameter being added.
       */
      'function addParamsToForm(form, key, value) {' +
      '  var hiddenField = document.createElement(\'input\');' +
      '  hiddenField.setAttribute(\'type\', \'hidden\');' +
      '  hiddenField.setAttribute(\'name\', key);' +
      '  hiddenField.setAttribute(\'value\', value);' +
      '  form.appendChild(hiddenField);' +
      '};' +
      'var form = document.createElement(\'form\');' +
      'form.setAttribute(\'method\', \'POST\');' +
      'form.setAttribute(\'action\',' +
      '                  \'http://\' + \'' + SERVER + '\'' +
      '                  + \'/searchbyimage/upload\');' +
      'form.setAttribute(\'enctype\', \'multipart/form-data\');' +
      'addParamsToForm(form, \'image_content\', \'' + inlineImage + '\');' +
      'addParamsToForm(form, \'filename\', \'\');' +
      'addParamsToForm(form, \'image_url\', \'\');' +
      'addParamsToForm(form, \'' + CHROME_EXTENSION_VERSION_PARAMETER_NAME +
      '\', \'' + CHROME_EXTENSION_VERSION + '\');' +
      'document.body.appendChild(form);' +
      'form.submit();';
  chrome.tabs.executeScript(tab.id, {code: injectJavascriptCode});
}

/**
 * This function validates that the string only contains a-z, A-Z, 0-9, +, /, ..
 * @param {string} str The string to be validated.
 * @return {boolean} The validation result.
 */
function validateBase64(str) {
  for (var i = 0, c; c = str[i++];) {
    if (((c >= 'a') && (c <= 'z')) ||
        ((c >= 'A') && (c <= 'Z')) ||
        ((c >= '0') && (c <= '9')) ||
        (c == '+') || (c == '\/') ||
        (c == '.') || (c == '=')) {
      continue;
    }
    return false;
  }
  return true;
}

/**
 * The context menu click event handler.
 * @param {object} info The relevant data for the context menu.
 * @param {object} tab The tab of which the context menu is actived.
 * @return {boolean} The result of this function.
 */
function sbiSearch(info, tab) {
  var src = info.srcUrl;
  if (src.indexOf('data:') == 0) {
    lower_src = src.toLowerCase();
    // Make sure the content type is valid to avoid security attack.
    if ((!lower_src.indexOf('data:image/bmp;')) ||
        (!lower_src.indexOf('data:image/gif;')) ||
        (!lower_src.indexOf('data:image/jpeg;')) ||
        (!lower_src.indexOf('data:image/jpg;')) ||
        (!lower_src.indexOf('data:image/png;')) ||
        (!lower_src.indexOf('data:image/tiff;')) ||
        (!lower_src.indexOf('data:image/x-ico;')) ||
        (!lower_src.indexOf('data:image/x-tiff;'))) {
      // If this is a safe inline image.
      var base64Offset = src.indexOf(',');
      if ((base64Offset != -1) &&
          (validateBase64(src.substring(base64Offset + 1)))) {
        localStorage['imagePreview'] = src;
        // TODO(howardzhou): Investigate this weird transition which seems to
        // cause some users to be stuck on the transition page.
        // First transition to an intermediate server, then perform
        // Search-by-Image for the specific URL from the new tab callback.
        chrome.tabs.query({'active': true,
                           'lastFocusedWindow': true },
                          function(tab) {
          chrome.tabs.create({'url': 'http://' + INTERMEDIATE_SERVER,
                              'index': tab[0].index + 1,
                              'selected': true },
                             newTabCallback);
        });
      }
    }
  } else {
    var url = 'http://' + SERVER + '/searchbyimage?' +
        CHROME_EXTENSION_VERSION_PARAMETER_NAME + '=' +
        CHROME_EXTENSION_VERSION + '&image_url=' +
        encodeURIComponent(src);
    // Perform Search-by-Image for the specific URL.
    chrome.tabs.query({'active': true,
                       'lastFocusedWindow': true},
                      function(tab) {
      chrome.tabs.create({'url': url,
                          'index': tab[0].index + 1,
                          'selected': true });
    });
  }
  return true;
}

// Register the onClicked event listener.
chrome.contextMenus.onClicked.addListener(sbiSearch);

//Create the Search-by-Image entry point on the context menu.
chrome.contextMenus.create({
  'title': chrome.i18n.getMessage('contextMenuTitle'),
  'contexts': ['image'],
  'id': 'sbiContextMenu'
});
