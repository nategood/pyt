jot =
    client =
        init: (transition) ->

            # // todo configuration option to specify
            # // how to break up markdown into slides
            # // e.g. use horizontal rules vs. headers
            $slides = $('hr')
            count   = $slides.length
            current = 0

            $slides.css
                "margin-top": "500px"
                "height":0
                "width": 0
                "margin-left":"-9999px"
            $($slides[0]).css
                "margin-top": "0"

            # // todo load in other client js dependencies like jquery...

            # // todo check if callable function
            if transition.onInit then transition.onInit($slides)

            $(window).keydown (e) ->
                console.log(current);
                # todo better keyCode detection
                switch e.keyCode
                    when 13, 39
                        current = (current + 1) % count
                    when 37
                        if current <= 0 then return
                        current = (current - 1) % count
                    else
                        return

                if transition.onChange then transition.onChange current, () ->
                    window.location = "#s" + current
        register: (transition) ->
            $ ()->
                jot.client.init transition
