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
  "thirty_second":32
};

/**
* a lookup table for the highest allowed note for each clef type. This is used
* to determine the y position of a note being inserted
* 
*/
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

/**
* in live_score.Note, this how a note is denoted
*/
live_score.note_type = "n";

live_score.insert_mode = "insert";

live_score.remove_mode = "remove";

/**
* translate_pitch_to_midi_number
*   given a pitch of the style "d/5" d being the note and 5 being the 
*   octave number, returns the midi note number equivalent
* args
*   pitch
*     a string of the style "d/5" d being the note and 5 being the 
*     octave number. This is the format used by Vexflow
* returns
*   midi_value
*     an integer representing the pitch value as midi value
*/
live_score.translate_pitch_to_midi_number = function(pitch){
  var note = pitch.split("/")[0];
  note = note.toUpperCase();
  var octave = pitch.split("/")[1];
  note = live_score.note_to_integer_table[note];
  octave = parseInt(octave,10);
  var midi_value = note + ((octave + 1) * 12);
  return midi_value;
};

/**
* translate_midi_number_to_pitch
*   given a midi note value, converts it to a Vexflow style pitch string
* args
*   midi_number
*     an integer representing a pitch value
* returns
*   pitch
*     a string of the style "d/5" d being the note and 5 being the 
*     octave number. This is the format used by Vexflow
*/
live_score.translate_midi_number_to_pitch = function(midi_number){
  var note = midi_number%12;
  note = live_score.integer_to_note_table[note];
  var octave = Math.floor(midi_number/12) - 1;
  octave = octave.toString();
  var pitch = note +"/"+ octave;
  return pitch;
};

/**
* a table that converts an integer to its corresponding note name
*/
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

/**
* a table that converts a note name to its corresponding integer
*/
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

/**
* a constant used by Vexflow to calculate rhythmic positioning
* also used by live_score for rhythmic position
* represents the number of ticks in a 4/4 measure
*/
live_score.RESOLUTION = Vex.Flow.RESOLUTION;

/**
* note_length_to_ticks
*   converts a note length into the equivalent number of ticks
* args
*   note_length
*     the note length being converted
* returns
*   an integer equal to the number of ticks of note_length
*/
live_score.note_length_to_ticks = function(note_length){
  return Vex.Flow.RESOLUTION/note_length;
};

/**
* ticks_to_note_length
*   converts a number of ticks into the equivalent note_length
* args
*   ticks
*     the number of ticks being converted
* returns
*   a note length equivalent to the number of ticks
*/
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

live_score.note_length_greater_than = function(note_length_1,note_length_2){
  return (note_length_1 < note_length_2);
};

/**
* set_note_length_lcm
*   find the lowest common multiple of all the note lengths
*   this can be used to have the number of ticks of each measure
*   always be divisible by the duration of each note
* args
*   none
* returns
*   none
*/
live_score.set_note_length_lcm = function(){
  var note_lengths = [];
  for (var note_length in live_score.note_lengths) {
    note_lengths.push(live_score.note_lengths[note_length]);
  }
  live_score.note_length_lcm = live_score.lcm_of_array(note_lengths);
};

/**
* lcm_of_array
*   finds the lowest common multiple of an array of integers
* args
*   a
*     an array if integers
* returns
*   result
*     the lcm of the array of integers
*/
live_score.lcm_of_array = function(a){
  var result = a[0];
  for(var i = 1; i < a.length; i++){
    result = live_score.lcm_of_pair(result, a[i]);
  }
  return result;
};

/**
* lcm_of_pair
*   finds the lowest common multiple of two numbers
* args
*   b
*     an integer
*   c
*     an integer
* returns
*   the lcm of b and c
*/

live_score.lcm_of_pair = function(b, c){
  return b * (c / live_score.gcd_of_pair(b,c));
};

/**
* gcd_of_pair
*   finds the greatest common divisor of two integers
* args
*   b
*     an integer
*   c
*     an integer 
* returns
*   b
*     the greatest common divisor of b and c
*/

live_score.gcd_of_pair = function(b, c){
  while(c > 0){
    var temp = c;
    c = b % c;
    b = temp;
  }
  return b;
};

