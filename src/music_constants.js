live_score = require("./live_score.js");
Vex        = require("vexflow");

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

live_score.note_type = "n";


live_score.translate_pitch_to_midi_number = function(pitch){
  var note = pitch.split("/")[0];
  note = note.toUpperCase();
  var octave = pitch.split("/")[1];
  note = live_score.note_to_integer_table[note];
  octave = parseInt(octave,10);
  var midi_value = note + ((octave + 1) * 12);
  return midi_value;
};

live_score.translate_midi_number_to_pitch = function(midi_number){
  var note = midi_number%12;
  note = live_score.integer_to_note_table[note];
  var octave = Math.floor(midi_number/12) - 1;
  octave = octave.toString();
  var pitch = note +"/"+ octave;
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

live_score.RESOLUTION = Vex.Flow.RESOLUTION;
live_score.note_length_to_ticks = function(note_length){
  return Vex.Flow.RESOLUTION/note_length;
};

live_score.ticks_to_note_length = function(ticks){
  var derived_note_length = 0;
  for(var note_length_name in live_score.note_lengths){
    var note_length = live_score.note_lengths[note_length_name];
    if(Math.round(ticks*note_length) === live_score.RESOLUTION){
      derived_note_length = note_length;
    }
  }
  return derived_note_length;
};


live_score.set_note_length_lcm = function(){
  var note_lengths = [];
  for (var note_length in live_score.note_lengths) {
    note_lengths.push(live_score.note_lengths[note_length]);
  }
  live_score.note_length_lcm = live_score.lcm_of_array(note_lengths);
};

live_score.lcm_of_array = function(a){
  var result = a[0];
  for(var i = 1; i < a.length; i++){
    result = live_score.lcm_of_pair(result, a[i]);
  }
  return result;
};

live_score.lcm_of_pair = function(b, c){
  return b * (c / live_score.gcd_of_pair(b,c));
};

live_score.gcd_of_pair = function(b, c){
  while(c > 0){
    var temp = c;
    c = b % c;
    b = temp;
  }
  return b;
};




