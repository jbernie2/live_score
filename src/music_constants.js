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

live_score.highest_clef_pitch = {
  "treble":"g/6"
};

/**
* the pitch that all rests are displayed at
*/
live_score.rest_pitch = "d/5";

/**
* in live_score.Note, this how a rest is denoted
*/
live_score.rest_type = "r";


live_score.translate_pitch_to_midi_number = function(pitch){
  var note = pitch.split("/")[0];
  var octave = pitch.split("/")[1];
  note = live_score.note_to_integer_table[note];
  octave = parseInt(octave,10);
  var midi_value = note + (octave * 12);
  return midi_value;
};

live_score.translate_midi_number_to_pitch = function(midi_number){
  var note = midi_number%12;
  note = live_score.integer_to_note_table[note];
  var octave = Math.floor(midi_number/12);
  octave = octave.toString();
  var pitch = note + octave;
  return pitch;
};

live_score.integer_to_note_table = {
  0: "C",
  1: "C#",
  2: "D",
  3: "D#",
  4: "E",
  5: "F",
  6: "F#",
  7: "G",
  8: "G#",
  9: "A",
  10: "A#",
  11: "B"
};

live_score.note_to_integer_table = {
  "C" :0,
  "C#":1,
  "D" :2,
  "D#":3,
  "E" :4,
  "F" :5,
  "F#":6,
  "G" :7,
  "G#":8,
  "A" :9,
  "A#":10,
  "B" :11
};




