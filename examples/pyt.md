# PYT: Present Your Thoughts
## Use your arrows

---

## Markdown to Presentation

This entire HTML based presentation was created from a single markdown file!  The markdown file is plain old markdown.  Horizontal rules, `---`, are used to separate slides.  A trivial markdown file for PYT with two slides might look like...

    # Slide One
    
     - Content
    
    ---
    
    # Slide Two
    
     - More content

---

## Making it Pretty

Once you have your presentation ready to go in markdown, you can use pyt to turn it into a single, HTML presentation file.  The `pyt` utility takes two parameters: first, the markdown file with your presentation content and second, the path where jot should put the HTML presentation.

    pyt path/to/markdown.md path/where/to/save/presentation.html

_Note: If you omit the second argument, it will write the file to standard out.  Also, pyt has a `--watch` option for watching changes to your markdown file so you don't have to constantly compile your markdown into pyt presentations._

---

## Check it out

 - After you run `pyt` against your markdown file
  - Open the html file in your browser
  - Use your arrow keys to navigate between slides
 - It's that easy

---

## Todo list

 - Add better support for custom themes
 - Ability to watch a directory
 - Add ability to pass in additional variables at compile time
  - Colors for your theme
  - Transitions/Effects
 - Better integration for "stylus" and "jade" into themes
 - More options for slide layouts (including images)
 - Presenter via to accompany presentation

---

## Thanks

[PYT](https://github.com/nategood/pyt) is created by [Nate Good](http://nategood.com)