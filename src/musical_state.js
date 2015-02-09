live_score       = require("./live_score.js");
live_score.Stave = require("./stave.js");

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
*   stave_options
*     an array of contains information about the staves, each position in the
*     array is another stave that is to be creatd. See live_score.add_staves
*     for usage example 
* returns
*   none
*/
live_score.Musical_state.prototype.add_staves = function(stave_options){
  for(var i = 0; i < stave_options.length; i++){
    this.staves.push(new live_score.Stave(stave_options[i]));
  }
};

/**
* add_measures
*   adds additional measures to all staves in the score
* args
*   num_measures
*     the number of measures to be added to the score
*   measure_options
*     the measure time signature information
* returns
*   none
*/
live_score.Musical_state.prototype.add_measures = function(num_measures,
  measure_options){
  for(var i = 0; i < this.staves.length; i++){
    this.staves[i].add_measures(num_measures, measure_options);
  }
};

live_score.Musical_state.prototype.add_note = function(note_info){
  this.staves[note_info.stave_num].add_note(note_info);
  return this.staves;
};
module.exports = live_score.Musical_state;
