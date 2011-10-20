(function($) {

$.widget("mapQuery.mqFeatureSpeak", {
    options: {
        eventName : "_featurehover"
    },
    _create: function() {
        var map;
        var self = this;
        var element = this.element;

        //get the mapquery object
        map = $(element).data('mapQuery');

        var layers = $.map(map.layers(), function(layer) {
            return layer.isVector ? layer : null;
        });



        var current_feature = null;

        var feature_over = function() {
            if (current_feature) {
                $(element).trigger(self.options.eventName, [current_feature]);
            }
        }

        var debounced_feature_over = _.debounce(feature_over, 1000);

        $.each(layers, function() {
            var layer = this;

            var featuremouseover = function(e) {
                //console.log(e.feature.data);
                current_feature = e.feature.data;
                debounced_feature_over();

            };

            var featuremouseout = function(e) {
                current_feature = null;
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