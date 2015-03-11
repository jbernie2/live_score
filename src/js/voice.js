live_score         = require("./live_score.js");
live_score.Measure = require("./measure.js");

/**
* Voice
*   Constructor for the live_score.Voice object
* args
*   measure_meta_data
*     an array (whose length is the number of measures) with time signature
*     information about each measure
* returns
*   none
*/
live_score.Voice = function(measure_meta_data){

  /**
  * (see function description)
  */
  this.measure_meta_data = measure_meta_data;

  /**
  * an array of arrays, each element is an array of the notes played in that
  * given measure
  */
  this.measures = [];

  this.create_empty_voice();
};

/**
* create_empty_voice
*   creates a voice filled with rests whose length is equal to that indicated
*   by the measure_meta_data
* args
*   none
* returns
*   none
*/
live_score.Voice.prototype.create_empty_voice = function(){
  for(var i = 0; i < this.measure_meta_data.length; i++){
    this.measures.push(new live_score.Measure(this.measure_meta_data[i]));
  }
};

/**
* add_note
*   adds a note to the voice
* args
*   note_info
*     a struct, see structs.js, containing info about the note being inserted
* returns
*   a boolean of whether the note was successfully inserted
*/
live_score.Voice.prototype.add_note = function(note_info){
  return this.measures[note_info.measure_num].add_note(note_info);
};

/**
* remove_note
*   removes a note from a measure
* args
*   note_info
*     a struct (see structs.js) that contiains information about the
*     note being removed
* returns
*   none
*/
live_score.Voice.prototype.remove_note = function(note_info){
  return this.measures[note_info.measure_num].remove_note(note_info);
};

module.exports = live_score.Voice;
