live_score = require("./live_score.js");

/**
* a conversion table between the note length names, and the values used 
* to represent those note lengths
*/
live_score.note_lengths = {
  "whole":1,
  "half":2,
  "quarter":4,
  "eighth":8,
  "sixteenth":16,
  "thirty-second":32
};

/**
* the pitch that all rests are displayed at
*/
live_score.rest_pitch = "d/5";

/**
* in live_score.Note, this how a rest is denoted
*/
live_score.rest_type = "r";

