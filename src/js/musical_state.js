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

live_score.Musical_state.prototype.add_note = function(note_info){
  this.staves[note_info.stave_num].add_note(note_info);
  return this.staves;
};
module.exports = live_score.Musical_state;
