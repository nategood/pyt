fs      = require "fs"
md      = require "markdown"
jade    = require "jade"
stylus  = require "stylus"
opt     = require "optimist"
# express = require"express"

pyt =
    template:   '/themes/default/template.jade'
    style:      '/themes/default/style.stylus'
    transition: '/transitions/slide.js'
    server:
        init: (options) ->
            # todo express server
            return
    cli: (args) ->
        args = opt
            .default
                template: pyt.template
                style: pyt.style
                transition: pyt.transition
            .boolean 'o'
            .alias 'o', 'stdout'
            .describe 'o', 'Write to standard out instead of a file.'
            .boolean 'w'
            .alias 'w', 'watch'
            .describe 'w', 'Watch a particular markdown file for changes and automatically compilte to pyt presentation on updates.'
            .parse args

        # Shift off "node" argument if present
        if args._.length > 0 and args._[0] == 'node' then args._.shift()

        # Shift off the "pyt" cmd
        args._.shift()

        if args._.length < 1 then pyt.error "Expects at least one arguments"
        if args._.length < 2 then args.watch && pyt.error "Expects at two arguments when using --watch"

        input   = args._[0]
        output  = if args._.length > 1 then args._[1] else null

        if args.watch
            pyt.watch
                input: input
                output: output
        else
            pyt.render
                input: input
                output: output
    watch: (options) ->
        # initial render
        pyt.render options

        # now continue to watch it
        # todo make "watching" an option
        fs.watchFile options.input, (curr, prev) ->
            if curr.mtime == prev.mtime then return
            pyt.render options
    render: (options) ->
        #  An easy way to id the first slide...
        prefix = '<hr />'

        path = __dirname # __process.cwd()

        markup      = "#{path}/markup/index.jade"
        theme       = "#{path}/style/themes/default.styl"
        transition  = "#{path}/transitions/slide.js"

        rd = (path) ->
            fs.readFileSync(path).toString()

        opts = filename: theme
        vars =
            title: "My Title"
            author: "Nathan"
            content: prefix + md.markdown.toHTML rd options.input,
            scripts: [
                rd "#{path}/lib/pyt-client.js"
                rd "#{path}/assets/js/jquery.min.js"
                rd "#{path}/assets/js/jquery.scrollTo-1.4.2-min.js"
                rd transition
            ]
        html = (jade.compile rd theme, opts)(vars)

        # Write to file if we've been given a string
        writeToFile = typeof options.output == 'string'
        if writeToFile
            fs.writeFile options.output, html, (err) ->
                if err
                    pyt.error "Unable to write file: " + output
                # else
                # success.  fire an event?
        else
            process.stdout.write html
    error: (e) ->
        console.error e
        process.exit 1


module.exports = pyt