# live_score v0.4.0

An interactive score editor in javascript.

## What is live_score

live_score is an interactive score editor written entirely in javascript.
live_score allows for score creation, editing, and playback right in
you browser. live_score is based on the [VexFlow](http://vexflow.com) music notation
rendering API and uses [MIDI.js](https://github.com/mudcube/MIDI.js/) for Midi playback
A demo of the current version of live_score is available [here](http://jbernie2.github.io)

## Version 1.0.0 Planned Features
  1. Allow for addition of notes to score
  2. Allow for removal of notes from score
  3. Allow for whole, half, quarter, sixteenth, and thirty-second notes
  4. Allow for the number of measures to be expanded or contracted
  5. Allow for score play-back  

## Developing live_score

Install Prerequisites:

  1. [node js](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)
  2. [npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm)
  3. [grunt-cli](http://gruntjs.com/getting-started)


Clone This Repo:

    $ git clone https://github.com/jbernie2/live_score.git

Install Dependencies Via NPM:

    $ cd live_score
    $ npm install

Building The Project

    $ grunt

Running Locally

    Open build/index.html in your browser

Copyright (c) John Bernier 2015 <br/>
<john.b.bernier@gmail.com>
