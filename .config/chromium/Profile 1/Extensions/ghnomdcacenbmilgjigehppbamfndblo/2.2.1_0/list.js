var camelizerList = {
  asins: [],
  loaded: false,

  init: function(camelhump) {
    camelizer.tabs_locked = true;
    this.asins = camelhump.asins_ar;
    this.urls = camelhump.asins_hash;
    this.camelhump = camelhump;
    this.camelhump.detectRetailer();
    this.lookup();
    this.results = {};
  },

  lookup: function() {
    data = {"asins": this.asins, "locale": this.camelhump.locale, "page_asin": this.camelhump.asin}
    $('.tabs li').removeClass('active');
    $('#camelizerListLink').addClass('active');
    $('#camelizerDisplayLoading').show();
    $('#camelizerDisplayList').hide();
    that = this;
    camelAsync.get('http://'+this.camelhump.domain + '/camelizer/list', data, function(response) {
      that.response = response.response;
      $('#camelizerDisplayLoading').hide();
      if (response.status == 200) {
        that.loadResults();
      } else {
        $('#camelizerDisplayError').show();
      }
    }, 'html');
  },

  loadResults: function() {
    $('#camelizerDisplayList').show();
    $('#listsContainer').text('');
    root_domain = this.camelhump.content_url.replace(/(http:\/\/.*?)\/.*/, '$1');
    base_path = this.camelhump.content_url.split("").reverse().join("").replace(/.*?(\/.*)/, '$1').split("").reverse().join("");
    i = 0;
    data = $(this.response);
    $('#listsContainer').append(data);
    that = this;
    $('#notYetTracking').find('li').each(function(index) {
      asin = $(this).attr('rel');
      title = that.camelhump.asins_titles[asin];
      if (typeof title != 'undefined' && title != null && title != "") {
        $(this).text(title);
      }
    });
    $('#listsContainer').find('a').each(function(index) {
      asin = $(this).attr('rel');
      url = that.urls[asin];
      if (!url.match(/http(s|):\/\//)) {
        if (url.substr(0,1) == '/') {
          url = root_domain + url;
        } else {
          url = base_path + url;
        }
      }
      $(this).attr('href', url);
      $(this).click(function(e) {
        e.preventDefault();
        $(e.target).addClass('visited');
        camelizer.start($(e.target).attr('href'));
        return false;
      });
    });
    this.loaded = true;
    camelizer.tabs_locked = false;
  }

};
