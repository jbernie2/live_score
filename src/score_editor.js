live_score                 = require("./live_score.js");
live_score.Ui              = require("./ui.js");
live_score.Graphical_state = require("./graphical_state.js");
live_score.Musical_state   = require("./musical_state.js");
live_score.Renderer        = require("./renderer.js");

/**
* Score_editor
*   Constructor for live_score.Score_editor. This object encapsulates all
*   live_score's functionality and UI
* args
*   score_editor_div_id
*     the id of the div that will contain all live_score html
* returns
*   none
*/
live_score.Score_editor = function(score_editor_div_id){
 
  /**
  * catches all valid UI interactions and calls the appropriate Score_editor
  * function
  */
  this.ui = new live_score.Ui(this,score_editor_div_id);

  /**
  * Contains all the positional information about musical notation displayed,
  * used to interpret the UI actions involving clicks on the score.
  */
  this.gs = new live_score.Graphical_state();

  /**
  * Contains all the musical information about the score
  */
  this.ms = new live_score.Musical_state();

  /**
  * Converts the musical representation of the score into a vexflow score
  */
  this.renderer = new live_score.Renderer(this.ui.get_score_panel());

  this.create_empty_score();
};

live_score.Score_editor.prototype.create_empty_score = function(){
  
  var stave_options = [{clef:"treble"}];
  this.ms.add_staves(stave_options);
  
  var num_measures = 4;
  var measure_options = {num_beats:4, beat_value:4};
  this.ms.add_measures(num_measures,measure_options);
  
  this.renderer.render_score(this.ms.staves);
  
  this.gs.update(this.renderer);
  
  this.renderer.display_score();
};

/**
* add_staves
*   adds staves to the score
* args
*   event_info
*     information about the ui event, will be interpreted by Graphical_state
* returns
*   none
*/
live_score.Score_editor.prototype.add_staves = function(event_info){
  var stave_options = [{clef:"treble"}];
  this.ms.add_staves(stave_options);
};

/**
* add_measures
*   adds measures to the score
* args
*   event_info
*     information about the ui event, will be interpreted by Graphical_state
* returns
*   none
*/
live_score.Score_editor.prototype.add_measures = function(event_info){
  var num_measures = 4;
  var measure_options = {num_beats:4, beat_value:4};
  this.ms.add_measures(num_measures,measure_options);
};

/**
* add_note
*   adds notes to the score
* args
*   event_info
*     information about the ui event, will be interpreted by Graphical_state
* returns
*   none
*/
live_score.Score_editor.prototype.add_note = function(event_info){
  var note_info = this.gs.get_new_note_position(event_info);
  var staves = this.ms.add_note(note_info);
  this.renderer.render_score(staves);
  this.gs.update(this.renderer);
  this.renderer.display_score();
};

module.exports = live_score.Score_editor;
