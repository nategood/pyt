// slide
jot.client.register({
    // dependencies: [
    //     '/js/jquery.js',
    //     '/js/jquery.scrollTo-1.4.2-min.js'
    // ],
    onInit: function($slides) {
        var i = 0;
        $slides.each(function() {
            this.id = "s" + (i++);
            // $(this).next().hide();
        });
    },
    onChange: function(position, onComplete) {
        var slide = "#s" + position;
        $.scrollTo(slide, 1000, {easing:"swing", onAfter: onComplete});
        console.log(slide);
        // $(slide).next().hide().fadeIn(2000);
    }
});