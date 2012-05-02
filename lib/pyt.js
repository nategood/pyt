// Still semi fragile

var fs      = require("fs"),
    md      = require("markdown"),
    jade    = require("jade"),
    stylus  = require("stylus"),
    opt     = require("optimist");
    // express = require("express");

var pyt = {
    template:   '/themes/default/template.jade',
    style:      '/themes/default/style.stylus',
    transition: '/transitions/slide.js',
    server: {
        init: function(options) {
            // todo express server
        }
    },
    cli: function(args) {
        var args = opt
            .default({
                template: pyt.template,
                style: pyt.style,
                transition: pyt.transition
            })
            
            .boolean('o')
            .alias('o', 'stdout')
            .describe('o', 'Write to standard out instead of a file.')
            
            .boolean('w')
            .alias('w', 'watch')
            .describe('w', 'Watch a particular markdown file for changes and automatically compilte to pyt presentation on updates.')
            
            // .alias('t', 'template')
            // .alias('s', 'style')
            // .alias('r', 'transition')
            .parse(args);
        
        // Shift off "node" argument if present
        if (args._.length > 0 && args._[0] === 'node')
            args._.shift();

        // Shift off the "pyt" cmd
        args._.shift();
        
        args._.length < 1 && pyt.error("Expects at least one arguments");
        args._.length < 2 && args.watch && pyt.error("Expects at two arguments when using --watch");
        
        var input   = args._[0],
            output  = args._.length > 1 ? args._[1] : null;

        if (args.watch) {
            pyt.watch({input: input, output: output});
        } else {
            pyt.render({input: input, output: output});
        }
    },
    watch: function(options) {
        // initial render
        pyt.render(options);

        // now continue to watch it
        // todo make "watching" an option
        fs.watchFile(options.input, function(curr, prev) {
            if (curr.mtime === prev.mtime)
                return;
            pyt.render(options);
        });
    },
    render: function(options) {
        // An easy way to id the first slide...
        var prefix = '<hr />';

        var path = __dirname;

        var theme       = path + '/themes/default/index.jade'; // __process.cwd()
        var transition  = path + '/transitions/slide.js'; // __process.cwd()

        var rd = function(path) {
            return fs.readFileSync(path).toString();
        };

        var opts = {filename: theme};
        var html = jade.compile(rd(theme), opts)({
            title: "My Title",
            author: "Nathan",
            content: prefix + md.markdown.toHTML(rd(options.input)),
            scripts: [
                rd(path + '/pyt-client.js'),
                rd(path + '/assets/js/jquery.min.js'),
                rd(path + '/assets/js/jquery.scrollTo-1.4.2-min.js'),
                rd(transition)
            ]
        });

        // Write to file if we've been given a string
        var writeToFile = (typeof options.output === 'string');
        if (writeToFile) {
            fs.writeFile(options.output, html, function(err) {
                if (err) {
                    pyt.error("Unable to write file: " + output);
                } else {
                    // success.  fire an event?
                }
            });
        } else {
            process.stdout.write(html);
        }
    },
    error: function(e) {
        console.error(e);
        process.exit(1);
    }
};


module.exports = pyt;