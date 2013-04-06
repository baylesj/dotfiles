var camelizer;
var camelizer_urls = {};
var camelizer_data = {};
var tp_to_int = { "1m":1, "3m":2, "6m":3, "1y":4, "all":5 };
var R_PRODUCT_LOADED = 0;
var R_ERROR = 1;
var R_NOT_SUPPORTED = 2;
var R_PRODUCT_NOT_FOUND = 3;

var camelizer = {
  tabs_locked: true,

  createNewContext: function(url) {
    ctx = camelizer_urls[url];
    if (ctx) {
      this.context = ctx;
      return;
    }
    camelizer_urls[url] = null;
    this.context = new camelHump(url);
    camelizer_urls[url] = this.context;
    return;
  },
  
  constructChartURL: function() {
    context = this.context;
    url = context.detectRetailer();
    if (context.isBestbuy()) {
      file_name = "sale.png";
    } else if (context.isAmazon()) {
      file_name = [];
      $('input[name=cpf]:checked').each(function(index, obj) {
        file_name.push($(obj).val())
      });
      file_name = file_name.join('-') + ".png"
    } else {
      file_name = "newegg.png"
    }
    data = { 
      "force": 1,
      "desired": "true",
      "legend": 1,
      "ilt": 1,
      "tp": $('input[name=tp]:radio:checked').val(),
      "zero": ($('#close_up_view:checked').length == 0 ? 1 : 0),
      "fo": $('#remove_extreme_values:checked').val(),
      "h": $('#camelizerChart').height(),
      "w": $('#camelizerChart').width()
    }
    domain = context.domain;
    domain = domain.split(".").reverse().slice(0,2);
    domain = domain.reverse().join('.');
    return 'http://charts.' + domain + '/' + context.locale.toLowerCase() + '/' + context.asin + '/' + file_name + '?' + $.param(data);
  },

  saveFormSettings: function() {
    formSettings = {}
    formSettings["date_range"] = $('input[name=tp]:radio:checked').attr('id');
    formSettings["close_up_view"] = ($('#close_up_view:checked').length == 1 ? true : false);
    formSettings["remove_extreme_values"] = ($('#remove_extreme_values:checked').length == 1 ? true : false);
    if (camelizer.context.isAmazon()) {
      formSettings["pt_amazon"] = ($('#pt_amazon:checked').length == 1 ? true : false);
      formSettings["pt_new"] = ($('#pt_new:checked').length == 1 ? true : false);
      formSettings["pt_used"] = ($('#pt_used:checked').length == 1 ? true : false);
    }
    $.each(formSettings, function(key, val) {
      camelizerStore.set(key, val);
    });
  },

  ensureSelectedNotDisabled: function(callback) {
    camelizerStore.getMulti({"date_range":null}, function(data) {
      is_disabled = $('#'+data.date_range).button("option", "disabled");
      if (is_disabled && $('#'+data.date_range+':checked').length == 1) {
        // set date range to all
        $('#toggle_tp_5').attr('checked', 'checked');
        $('#camelizer_radio label').removeClass('ui-state-active');
        $('label[for="toggle_tp_5"]').addClass('ui-state-active');
        $('#dateslider').slider('value', 5);
      } else if (!camelizer.saveDefaults && $('#'+data.date_range).button('option', 'disabled') == false) {  
        // use case: first loads a product where default is disabled, then clicks on other products, and then on a product where their default can be enabled.
        //  check that saveDefaults is false because if they are still on the first product and change the time-period, we don't want to show their existing default.
        val = tp_to_int[$('#'+data.date_range).val()];
        $('#'+data.date_range).attr('checked', 'checked');
        $('#camelizer_radio label').removeClass('ui-state-active');
        $('label[for="'+data.date_range+'"]').addClass('ui-state-active');
        $('#dateslider').slider('value', val);
      }
      callback();
    });
  },

  checkTimePeriods: function() {
    $('input[name=tp]').button('enable');
    created_at = Date.parse(context.product_data.created_at)/1000; 
    now = new Date().getTime()/1000;
    days_to_ids = {"30":"1", "91":"2", "182":"3", "365":"4"}
    for(days in days_to_ids) {
      if (now-(days*86400) < created_at) {
        $('#toggle_tp_'+days_to_ids[days]).button("disable");
      }
    }
  },

  updateChart: function(saveDefaults) {
    camelizer.tabs_locked = true;
    this.saveDefaults = saveDefaults
    context = camelizer.context;
    this.checkTimePeriods();
    this.ensureSelectedNotDisabled(function() {
      if (camelizer.saveDefaults) {
        camelizer.saveFormSettings();
      }
      url = camelizer.constructChartURL(context);
      if (context.product_data != null) {
        $("#camelizerUrl a").attr('href', context.product_data.product_url).text(context.product_data.link_phrase);
        $("#camelizerFeedbackUrl").attr('href', context.product_data.feedback_url);
      }    
      $('#camelizerChart').one('load', function() {
        $('.throbber').css('visibility', 'hidden');
        camelizer.hideAllDisplays();
        $('#camelizerUrl').show();
        $("#camelizerDisplayChart").show();
        $("#productPageLink").hide();
        if(camelizer.context.asin != camelizer.first_asin) {
          $('#productPageLink').show();
          $('#productPageLink').find('a').attr('href', context.content_url);
        }
        if (camelizer.context.asins_ar.length > 1) {
          $('#camelizerListLink').show();
        }
        if (context.isAmazon()) {
          $('#controlbox_price_type').show();
        } else {
          $('#controlbox_price_type').hide();
        } 
        camelizer.tabs_locked = false;
      });
      $('#camelizerChart').attr('src', url);
    });
  },

  onLoad: function(url) {
    this.hideAllDisplays();
    this.tabs_locked = true;
    camelizer_urls = {} // for firefox to stop too much caching.
    this.createNewContext(url);
    this.context.detectRetailer();
    this.first_asin = this.context.asin;
    that = this;
    getAsins(that.context, function(hump, tab) {
      camelizer_urls[url] = hump;
      that.context = hump;
      if (hump.asin == null && hump.asins_ar.length > 0) {
        camelizerList.init(hump);
      } else {
        camelizerList.loaded = false;
        that.start(url);
      }
    });
  },
    
  start: function(url) {
    $('.tabs li').removeClass('active');
    $('#camelizerChartLink').addClass('active');
    this.tabs_locked = true;
    this.createNewContext(url);
    this.context.detectRetailer();
    if (this.context.request_url){
      this.displayLoading(this.context);
      this.initiateProductLookup();
    } else {
      this.context.product_data = {"result_code": R_NOT_SUPPORTED};
      this.updateDisplay();
    }
  },
  
  initiateProductLookup: function() {
    if (camelizer_data[this.context.asin]) {
      camelizer.context.product_data = camelizer_data[this.context.asin];
      this.updateChart(false);
    } else {
      camelAsync.get(this.context.request_url, null, function(data) {
        try {
          camelizer_data[camelizer.context.asin] = data.response;
          camelizer.context.product_data = data.response;
          camelizer.updateDisplay();
        } catch (e) {
          console.log(e);
          console.log(e.message);
          console.log(e.stack);
          camelizer.context.product_data = {"result_code":1};
        }
      });
    }
  },
  
  hideAllDisplays: function() {
    $("#camelizerNoProduct").hide();
    $("#camelizerDisplayLoading").hide();
    $("#camelizerDisplayError").hide();
    $("#camelizerDisplayChart").hide();
    $("#camelizerDisplayList").hide();
    $("#camelizerDisplayNotSupported").hide();
    $("#camelizerDisplayProductNotFound").hide();
  },
  
  updateDisplay: function() {
    ctx = this.context;
    switch (ctx.product_data.result_code)
    {
    case R_PRODUCT_LOADED:
        camelizer.displayLoading(ctx, "Product data downloaded, loading chart image...");
        camelizer.updateChart(false);
    break;
    
    case R_ERROR:
      camelizer.displayError(ctx);
    break;
    
    case R_NOT_SUPPORTED:
      camelizer.displayNotSupported(ctx);
    break;
    
    case R_PRODUCT_NOT_FOUND:
      camelizer.displayProductNotFound(ctx);
    break;
    }
  },
  
  
  displayError: function(ctx) {
    camelizer.hideAllDisplays();
    $("#camelizerDisplayError").show();
    camelizer.tabs_locked = false;
  },
  
  displayLoading: function(ctx, msg) {
    camelizer.hideAllDisplays();
    $("#camelizerDisplayLoading").show();
    camelizer.setLoadingText(msg ? msg : "Loading...");
  },
  
  displayNotSupported: function(ctx) {
    camelizer.hideAllDisplays();
    $("#camelizerDisplayNotSupported").show();
    camelizer.tabs_locked = false;
  },
  
  displayProductNotFound: function(ctx) {
    camelizer.hideAllDisplays();
    $("#camelizerDisplayProductNotFound").show();
    camelizer.tabs_locked = false;
  },
  
  setLoadingText: function(msg) {
    document.getElementById("camelizerLoadingText").innerHTML = msg;
  }

}

$(document).ready(function() {
  // get saved form settings if there are any. if none, set defaults.
  dic = {"pt_amazon": true, "pt_new": true, "pt_used": true, "close_up_view": true, "remove_extreme_values": true, 'date_range': 'toggle_tp_5'};
  camelizerStore.getMulti(dic, function(data) {
    $.each(dic, function(key, val) {
      res = data[key];
      if (key == 'date_range') {
        $('#'+res).prop('checked', res);
        val = tp_to_int[$('#'+res).val()];
        $('label[for="toggle_tp_'+val+'"]').addClass('ui-state-active');
        date_slider = $("#dateslider");
        date_slider.slider({min: 1, 
          max: 5, 
          value: val,
          stop: function(event, ui) {
            $('#toggle_tp_'+ui.value).attr('checked', 'checked')
            $('#camelizer_radio').find('label').removeClass('ui-state-active').addClass('ui-state-default');
            $('label[for="toggle_tp_'+ui.value+'"]').addClass('ui-state-active');
            $(this).closest('.controlbox').find('.throbber').css('visibility', 'visible');
            camelizer.updateChart(true);   
            return true;
          },
          slide: function(event, ui) {  
            if($('#toggle_tp_'+ui.value).attr('disabled') == 'disabled') {
              return false;
            }
            return true;
          }
        });
      } else {
        $('#'+key).prop('checked', res);
      }
    });
  });
      
  $('#camelizer_radio').buttonset();
  
  $('input[name=tp]:radio').change(function() {
    $(this).closest('.controlbox').find('.throbber').css('visibility', 'visible');
    tp = $('input[name=tp]:radio:checked').val();
    $("#dateslider").slider("value", tp_to_int[tp]);
    camelizer.updateChart(true);   
  });
    
  $('input[type="checkbox"]').change(function(e) {
    $(this).closest('.controlbox').find('.throbber').css('visibility', 'visible');
    camelizer.updateChart(true);   
  });

  $('#camelizerListLink a').click(function(e) {
    e.preventDefault();
    if (camelizer.tabs_locked) {
      return false;
    }
    $('.tabs li').removeClass('active');
    $(e.target).closest('li').addClass('active');
    if (camelizerList.loaded) {
      camelizer.hideAllDisplays();
      $('#camelizerDisplayList').show();
    } else {
      camelizer.hideAllDisplays();
      camelizerList.init(camelizer.context);
      camelizer.setLoadingText("Loading...");
    }
    return false;
  });
  
  $('#camelizerChartLink a').click(function(e) {  
    e.preventDefault();
    if ($(e.target).closest('li').hasClass('active') || camelizer.tabs_locked) {
      return false;
    }
    camelizer.hideAllDisplays();
    $('.tabs li').removeClass('active');
    $(e.target).closest('li').addClass('active');
    if (camelizer.context.asin) {
      $("#camelizerDisplayChart").show();
    } else{
      camelizer.hideAllDisplays();
      $("#camelizerNoProduct").show();
      return;
    }
    return false;
  });

  $("#camelizerNoProduct a").click(function(e) {
    $("#camelizerListLink a").click();
    return false;
  });


  bindChartLinks();
});
