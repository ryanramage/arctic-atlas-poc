$(document).ready(function(){

  // scroll spy logic
  // ================

  var activeTarget,
      $window = $(window),
      position = {},
      nav = $('body > .topbar li a');
	  
      var targets = nav.map(function () {
        return $(this).attr('href');
      });

      var offsets = $.map(nav, function (id) {
        return $(id).offset().top;
      });


  function setButton(id) {
    nav.parent("li").removeClass('active');
    $(nav[$.inArray(id, targets)]).parent("li").addClass('active');
  }

  function processScroll(e) {
    var scrollTop = $window.scrollTop() + 10, i;
    for (i = offsets.length; i--;) {
      if (activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1])) {
        activeTarget = targets[i];
        setButton(activeTarget);
      }
    }
  }

  nav.click(function () {
    processScroll();
  });

  processScroll();

  $window.scroll(processScroll);


  // Dropdown example for topbar nav
  // ===============================

  $("body").bind("click", function (e) {
    $('a.menu').parent("li").removeClass("open");
  });

  $("a.menu").click(function (e) {
    var $li = $(this).parent("li").toggleClass('open');
    return false;
  });




  // add on logic
  // ============

  $('.add-on :checkbox').click(function() {
    if ($(this).attr('checked')) {
      $(this).parents('.add-on').addClass('active');
    } else {
      $(this).parents('.add-on').removeClass('active');
    }
  });


  // Disable certain links in docs
  // =============================

  $('ul.tabs a, ul.pills a, .pagination a, .well .btn, .actions .btn, .alert-message .btn, a.close').click(function(e) {
    e.preventDefault();
  });

  // Copy code blocks in docs
  $(".copy-code").focus(function() {
    var el = this;
    // push select to event loop for chrome :{o
    setTimeout(function () {$(el).select();}, 1);
  });


  // POSITION TWIPSIES
  // =================

  $('.twipsies.well a').each(function () {
    var type = this.title
      , $anchor = $(this)
      , $twipsy = $('.twipsy.' + type)

      , twipsy = {
          width: $twipsy.width() + 10
        , height: $twipsy.height() + 10
        }

      , anchor = {
          position: $anchor.position()
        , width: $anchor.width()
        , height: $anchor.height()
        }

      , offset = {
          above: {
            top: anchor.position.top - twipsy.height
          , left: anchor.position.left + (anchor.width/2) - (twipsy.width/2)
          }
        , below: {
            top: anchor.position.top + anchor.height
          , left: anchor.position.left + (anchor.width/2) - (twipsy.width/2)
          }
        , left: {
            top: anchor.position.top + (anchor.height/2) - (twipsy.height/2)
          , left: anchor.position.left - twipsy.width - 5
          }
        , right: {
            top: anchor.position.top + (anchor.height/2) - (twipsy.height/2)
          , left: anchor.position.left + anchor.width + 5
          }
      }

    $twipsy.css(offset[type])

  });
  var map = $('#map').mapQuery({
        layers:[{         //add layers to your map; you need to define at least one to be able to see anything on the map
               type: 'WMTS',
                label: 'naturalearth',
                url: 'data/wmts/1.0.0/NE1_HR_LC_SR_W_DR/default/10m'

            },{
                type: 'JSON',
                label: 'Polygons',
                url: 'data/poly.json'
            }, {
                type: 'vector',
                label: 'KML',
                url : "data/nunavutPlaces.kml",
                options: {format: new OpenLayers.Format.KML({
                            extractStyles: true,
                            extractAttributes: true,
                            maxDepth: 2
                        })}
            }
            
         ]
    });




    $('.zoom').mqZoomButtons({map: $('#map')});
    $('#map').mqFeatureSpeak({

    });

  var lp1 = $('#language1Player').jPlayer( {
        swfPath: "js/lib",
        ready: function () {
          $(this).jPlayer("setMedia", {
                mp3: "http://yoyodyne.cc/audio/nitotmozilla_da-m.mp3"
          });
        }

  });


  map.bind('_featurehover', function(event, feature_data) {

      console.log(feature_data);
      if (feature_data && feature_data.start) {
          lp1.jPlayer('play', feature_data.start);
          var duration = 10;
          if (feature_data.duration) duration = feature_data.duration;

          var stopPlaying = function() {
              
              lp1.jPlayer('pause');
          }
          setTimeout(stopPlaying, duration * 1000);


      }
  })




});