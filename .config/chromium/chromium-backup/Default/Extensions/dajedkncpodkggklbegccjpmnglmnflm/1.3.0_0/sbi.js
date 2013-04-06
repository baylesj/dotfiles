// Copyright 2011 Google Inc. All Rights Reserved.

/**
 * Search-by-Image Chrome extension.
 * Help users to use the Search-by-Image features more easily on Chrome.
 * Users can initiate a Search-by-Image option by right clicking any image on
 * a webpage and selecting "Search Google with this image".
 * Users can also move the mouse over an image and click the camera icon button
 * to initiate a search.
 *
 * TODO(howardzhou): Known issues as of version 1.2.0
 * 1. The camera icon does not move with the dynamically generated image during
 *    mouse scroll. (e.g. Clicking on an image on Pinterest.com front page, and
 *    an enlarged image will popup. The camera icon on that image does not move
 *    with the image during mouse scroll.
 * 2. The camera icon is positioned w.r.t. to the image position, but not its
 *    viewable area. As a result, if the bottom part of the image is covered
 *    up by some other element, the camera icon will appear to be floating on
 *    that other element.
 *
 *
 * @author yimingli@google.com (Yiming Li)
 * @author howardzhou@google.com (Howard Zhou)
 */

/**
 * The Search-by-Image server URL.
 * @private
 * @const
 */
var SERVER_ = 'www.google.com';

/**
 * The form id for submitting a POST request for an inline image.
 * @private
 * @const
 */
var CHROME_EXTENSION_SUBMIT_FORM_ID_ = 'sbi_chrome_extension_submit_form';

/**
 * The version parameter name for the Chrome extension.
 * @private
 * @const
 */
var CHROME_EXTENSION_VERSION_PARAMETER_NAME_ = 'sbisrc';

/**
 * The version string for Chrome extension.
 * @private
 * @const
 */
var CHROME_EXTENSION_VERSION_ = 'cr_1_3_0';

/**
 * The id of the camera button, which is a actually div element.
 * @private
 * @const
 */
var CAMERA_BUTTON_ID_ = 'sbi_camera_button';

/**
 * The width of the camera button.
 * @private
 * @const
 */
var CAMERA_BUTTON_WIDTH_ = 29;

/**
 * The height of the camera button.
 * @private
 * @const
 */
var CAMERA_BUTTON_HEIGHT_ = 27;

/**
 * The right margin of the camera button.
 * @private
 * @const
 */
var CAMERA_BUTTON_RIGHT_MARGIN_ = 1;

/**
 * The bottom margin of the camera button.
 * @private
 * @const
 */
var CAMERA_BUTTON_BOTTOM_MARGIN_ = 1;

/**
 * The minimal width of the image to show the camera button.
 * @private
 * @const
 */
var IMG_HOVER_MINIMAL_WIDTH_ = 45;

/**
 * The minimal height of the image to show the camera button.
 * @private
 * @const
 */
var IMG_HOVER_MINIMAL_HEIGHT_ = 45;

/**
 * The option value for the chrome extension.
 * Value "mouseover" for showing the camera button when the mouse cursor hovers
 * over the image.
 * Value "never" for never showing the camera button.
 * @private
 */
var option_;

/**
 * Points to the last active image.
 * @private
 */
var activeImage_ = null;

/**
 * This function validates the string only contains a-z, A-Z, 0-9, +, /, ..
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
 * Add the key value pair as a parameter to the form.
 * @param {Element} form The form being added.
 * @param {string} key The key of the parameter being added.
 * @param {string} value The value of the parameter being added.
 */
addParamsToForm = function(form, key, value) {
  var hiddenField = document.createElement('input');
  hiddenField.setAttribute('type', 'hidden');
  hiddenField.setAttribute('name', key);
  hiddenField.setAttribute('value', value);
  form.appendChild(hiddenField);
};

/**
 * Convert a relative URL to an absolute one, using the browser's internal
 * mechanism.
 * @param {string} url The original URL string.
 * @return {string} The absolute URL string.
 */
qualifyUrl = function(url) {
  var a = document.createElement('a');
  a.href = url;
  return a.href;
};

/**
 * Mousemove event listener for images. This will show the camera icon.
 * @param {Object} event The mouseover event.
 * @this {Element}
 */
sbiMouseover = function(event) {
  // Skip any non img element.
  if (!$(event.target).is('img')) {
    return;
  }
  chrome.storage.sync.get('sbi_option',
    /**
     * Callback function for chrome.storage.sync. Get the option values from
     * Chrome Storage API.
     * @param {Object} items The returned storage contents, items in their
     *                       key-value mappings.
     */
    function(items) {
      option_ = items.sbi_option;
      if (option_ != 'mouseover') {
        return;
      }

      var currentImage = $(event.target);
      // Skip rendering the camera button for the following cases:
      // 1. Images on the image result page, e.g. <img class="rg_i">.
      // 2. Images inside imagebox_bigimages, e.g. <img class="th">.
      // 3. Images that contain id="imgthumb", e.g. <img id="imgthumb">.
      if (currentImage.hasClass('rg_i') ||
          currentImage.hasClass('th ') ||
          // As of jQuery 1.6, the .attr() method returns undefined for
          // attributes that have not been set, so we need to test for that.
          (typeof(currentImage.attr('id')) != 'undefined' &&
           currentImage.attr('id').indexOf('imgthumb') == 0)) {
        return;
      }

      var height = currentImage.height();
      var width = currentImage.width();
      // Ignore too small images and hidden images.
      if ((height < IMG_HOVER_MINIMAL_HEIGHT_) ||
          (width < IMG_HOVER_MINIMAL_WIDTH_) ||
          (currentImage.css('display') == 'none')) {
        return;
      }

      var left = currentImage.offset().left +
          parseFloat(currentImage.css('paddingLeft')) +
          width -
          CAMERA_BUTTON_RIGHT_MARGIN_ -
          CAMERA_BUTTON_WIDTH_;
      var top = currentImage.offset().top +
          parseFloat(currentImage.css('paddingTop')) +
          height -
          CAMERA_BUTTON_BOTTOM_MARGIN_ -
          CAMERA_BUTTON_HEIGHT_;

      var cameraLinkDiv = document.getElementById(CAMERA_BUTTON_ID_);
      $(cameraLinkDiv).css('top', top.toString() + 'px');
      $(cameraLinkDiv).css('left', left.toString() + 'px');
      $(cameraLinkDiv).css('cursor', 'pointer');
      $(cameraLinkDiv).show();

      // JQuery .attr() does not automatically convert a relative URL to an
      // absolute one, so we need to add this extra step here.
      cameraLinkDiv.src = qualifyUrl(currentImage.attr('src'));
      activeImage_ = currentImage;
    }
  );
};

/**
 * Mouseleave event listener for images. This will hide the camera icon when
 * the mouse leaves the image, but only when it is detected that the mouse
 * is leaving the boundaries of the image. Otherwise, if the mouse is on the
 * camera icon, there is flickering.
 * @param {Object} event The mouseout event.
 */
sbiMouseout = function(event) {
  if (activeImage_ == null) {
    return;
  }

  var imageTop = activeImage_.offset().top;
  var imageLeft = activeImage_.offset().left;
  var imageWidth = activeImage_.width();
  var imageHeight = activeImage_.height();

  var mouseTop = event.pageY;
  var mouseLeft = event.pageX;

  if (mouseTop <= imageTop || mouseTop >= imageTop + imageHeight ||
      mouseLeft <= imageLeft || mouseLeft >= imageLeft + imageWidth) {
    var cameraLinkDiv = document.getElementById(CAMERA_BUTTON_ID_);
    $(cameraLinkDiv).hide();
  }
};

/**
 * Queries Google Image Search depending on the content of the image tag.
 * @param {string} src Image src to query.
 * @param {boolean} selected Whether to select/highlight the newly created
 *                           search result tab.
 */
sbiQueryImageSearch = function(src, selected) {
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
        var inlineImage = src.substring(base64Offset + 1)
            .replace(/\+/g, '-').replace(/\//g, '_')
            .replace(/\./g, '=');
        chrome.extension.sendRequest({'action': 'savePreview', 'image': src});

        var form = document.createElement('form');
        form.setAttribute('id', CHROME_EXTENSION_SUBMIT_FORM_ID_);
        form.setAttribute('method', 'POST');
        form.setAttribute('action',
                          'http://' + SERVER_ +
                          '/searchbyimage/upload');
        form.setAttribute('enctype', 'multipart/form-data');
        form.setAttribute('target', '_blank');
        addParamsToForm(form, 'image_content', inlineImage);
        addParamsToForm(form, 'filename', '');
        addParamsToForm(form, 'image_url', '');
        addParamsToForm(form,
            CHROME_EXTENSION_VERSION_PARAMETER_NAME_,
            CHROME_EXTENSION_VERSION_);

        var cameraLinkDiv = document.getElementById(
            CAMERA_BUTTON_ID_);
        cameraLinkDiv.appendChild(form);
        form.submit();
        cameraLinkDiv.removeChild(form);

        // If we don't want to the behavior of selecting (highlighting) the
        // search result tab that was just created. We need to tell
        // background.js to select the current tab.
        if (!selected) {
          chrome.extension.sendRequest({'action': 'selectCurrentTab'});
        }
      }
    }
  } else {
    var url = 'http://' + SERVER_ + '/searchbyimage?' +
              CHROME_EXTENSION_VERSION_PARAMETER_NAME_ + '=' +
              CHROME_EXTENSION_VERSION_ +
              '&image_url=' + encodeURIComponent(src);
    // Since content_script in Chrome cannot access chrome.tabs API, we have to
    // rely on passing the URL to background.js and requesting it to create a
    // new Chrome tab.
    chrome.extension.sendRequest({'action': 'sbiSearch',
                                  'url': url,
                                  'selected': selected });
  }
};

window.addEventListener('load',
  /**
   * The window load event listener. It will be triggered when Chrome starts.
   */
  function(event) {
    var target = event.target;
    if (target instanceof HTMLDocument &&
        // Ignore any inner frame element.
        !target.defaultView.frameElement) {
      // Bind the mouseover and mouseout event.
      document.addEventListener('mouseover', sbiMouseover, true);
      document.addEventListener('mouseout', sbiMouseout, true);

      var cameraLinkDiv = $('<div>').attr({
          id: CAMERA_BUTTON_ID_,
          class: 'sbi_search',
          style: 'left:0px;top:0px;' +
                  'position:absolute;width:' +
                  CAMERA_BUTTON_WIDTH_ +
                  'px;height:' + CAMERA_BUTTON_HEIGHT_ +
                  'px;border:none;' +
                  'margin:0px 0px 0px 0px;padding:0px 0px 0px 0px;' +
                  'z-index:2147483647;'
      });
      cameraLinkDiv.get(0).onclick = function(e) {
        // Capture ctrl-click and middle-click to create a tab in the background
        // and just on the right side of the current active tab. This behavior
        // is consistent with the effect of middle-click and ctrl-click on a
        // link element.
        if (e.ctrlKey ||  /* ctrl-click */
            e.button & 1  /* middle-click */) {
          sbiQueryImageSearch(this.src, false);
        } else {
          sbiQueryImageSearch(this.src, true);
        }
      }
      cameraLinkDiv.hide();

      // Add camera icon to the DOM tree.
      $('body').append(cameraLinkDiv);
    }
  }, false);
