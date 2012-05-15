# slide
jot.client.register
    onInit: ($slides) ->
        i = 0
        $slides.each () ->
            this.id = "s" + (i++)
            # $(this).next().hide();
    onChange: (position, onComplete) ->
        slide = "#s" + position;
        $.scrollTo slide, 1000,
            easing:"swing"
            onAfter: onComplete
        console.log slide
        # $(slide).next().hide().fadeIn 2000