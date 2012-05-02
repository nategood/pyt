var jot = {};
jot.client = {
    init: function (transition) {

        // todo configuration option to specify
        // how to break up markdown into slides
        // e.g. use horizontal rules vs. headers
        var $slides = $('hr');
        var count = $slides.length;
        var current = 0;

        $slides.css({"margin-top": "500px", "height":0, "width": 0, "margin-left":"-9999px"});
        $($slides[0]).css({"margin-top": "0"});

        // todo load in other client js dependencies like jquery...

        // todo check if callable function
        transition.onInit && transition.onInit($slides);

        $(window).keydown(function(e) {
            console.log(current);
            // todo better keyCode detection
            switch(e.keyCode) {
                case 13:
                case 39:
                    current = (current + 1) % count;
                    break;
                case 37:
                    if (current <= 0)
                        return;
                    current = (current - 1) % count;
                    break;
                default:
                    return;
            }

            transition.onChange && transition.onChange(current, function() {
                window.location = "#s" + current;
            });
        });
    },
    register: function(transition) {
        $(function() {
            jot.client.init(transition);
        });
    }
};