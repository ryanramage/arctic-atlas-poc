(function($) {

$.widget("mapQuery.mqFeatureSpeak", {
    options: {
        // The MapQuery instance
        map: undefined,

        // A function that returns HTML to be put into the popup.
        // It has one argument, which is the OpenLayers feature that
        // was selected.
        contents: undefined,

        // Title that will be displayed at the top of the feature info
        title: "Feature information"
    },
    _create: function() {
        var map;
        var self = this;
        var element = this.element;

        //get the mapquery object
        map = $(this.element).data('mapQuery');

        var layers = $.map(map.layers(), function(layer) {
            return layer.isVector ? layer : null;
        });

        $.each(layers, function() {
            var layer = this;

            var featuremouseover = function(e) {
                //console.log(e.feature.data);

            };

            var featuremouseout = function(e) {

            }


            var highlightCtrl = new OpenLayers.Control.SelectFeature(layer.olLayer, {
                hover: true,
                highlightOnly: true,
                renderIntent: "temporary",
                eventListeners: {
                    featurehighlighted: featuremouseover,
                    featureunhighlighted: featuremouseout
                }
            });


            layer.olLayer.map.addControl(highlightCtrl);
            highlightCtrl.activate();   

        });

    },
    _destroy: function() {

    },
    _onFeatureselected: function(evt, data) {
        console.log(data.feature);
    },
    _onFeatureunselected: function(evt, data) {

    }
});
})(jQuery);