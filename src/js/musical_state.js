live_score         = require("./live_score.js");
live_score.structs = require("./structs.js");
live_score.Stave   = require("./stave.js");

/**
* Musical_state
*   Constructor for the Musical_state object. This object is the high level
*   container for all the musical information represented in the score
* args
*   none
* returns
*   none
*/
live_score.Musical_state = function(){

  /**
  * An array of live_score.Stave objects representing the staves present in the
  * score
  */
  this.staves = [];
};

/**
* add_staves
*   adds additional staves to the score
* args
*   stave_info
*     an object that contains information about the stave. See 
*     live_score.add_staves for usage example 
* returns
*   none
*/
live_score.Musical_state.prototype.add_staves = function(num_staves, stave_info){
  for(var i = 0; i < num_staves; i++){
    var stave_info_copy = live_score.structs.shallow_copy(stave_info);
    this.staves.push(new live_score.Stave(stave_info_copy));
  }
};

/**
* add_measures
*   adds additional measures to all staves in the score
* args
*   measure_info
*     a struct containing the number of measures to add allong with 
*     the measures' time signature information
* returns
*   none
*/
live_score.Musical_state.prototype.add_measures = function(num_measures,
  measure_info){
  for(var i = 0; i < this.staves.length; i++){
    this.staves[i].add_measures(num_measures, measure_info);
  }
};

/**
* add_note
*   adds a note to the score
* args
*   note_info
*     a struct, described in structs.js containing information about the 
*     note being inserted 
* returns
*   this.staves
*     an array containing all the musical_state information
*/
live_score.Musical_state.prototype.add_note = function(note_info){
  this.staves[note_info.stave_num].add_note(note_info);
  return this.staves;
};

/**
* remove_note
*   removes a note from a measure
* args
*   note_info
*     a struct (see structs.js) that contiains information about the
*     note being removed
* returns
*   a boolean of whether or not the note was removed successfully 
*/
live_score.Musical_state.prototype.remove_note = function(note_info){
  this.staves[note_info.stave_num].remove_note(note_info);
  return this.staves;
};

/**
* get_staves_array
*   returns an array of the notes that are in each stave
* args
*   none
* returns
*   staves
*     an array of the notes that are in each stave
*/
live_score.Musical_state.prototype.get_staves_array = function(){
  var staves = [];
  for(var i = 0; i < this.staves.length; i++){
    staves.push(this.staves[i].get_measures_array());
  }
  return staves;
};

/**
* get_num_independent_notes
*   retrieves the number of musical objects that occur in a unique time
*   slice from the stave with the most uniquely placed object. This is used to
*   resize the score as the number of objects changes 
* args
*   none
* returns
*   max_independent_notes
*     The maximum number of uniquely placed musical objects from any one stave
*/
live_score.Musical_state.prototype.get_num_independent_notes = function(){
  var max_independent_notes = 0;
  var staves = this.get_staves_array();
  for(var i = 0; i < staves.length; i++){
    var num_independent_notes = 0;
    var measures = staves[i];
    for(var j = 0; j < measures.length; j++){
      var independent_notes = measures[j];
      num_independent_notes += independent_notes.length;
    }
    if(num_independent_notes > max_independent_notes){
      max_independent_notes = num_independent_notes;
    }
  }
  return max_independent_notes;
};

live_score.Musical_state.prototype.get_num_measures = function(){
  var staves = this.get_staves_array();
  return staves[0].length;
};

/**
* get_pitch_from_note_position
*   find the pitch of a note based on its y position
* args
*   note_info
*     a struct (see structs.js) with information about a musical note
* returns
*   The midi number pitch of the note 
*/
live_score.Musical_state.prototype.get_pitch_from_note_position = function(
  note_info){
  var stave_num = note_info.stave_num;
  var y_position = note_info.y_position;
  return this.staves[stave_num].get_pitch_from_note_position(y_position);
};

module.exports = live_score.Musical_state;
