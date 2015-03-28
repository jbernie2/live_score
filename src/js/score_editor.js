live_score                 = require("./live_score.js");
live_score.structs         = require("./structs.js");
live_score.Ui              = require("./ui.js");
live_score.Graphical_state = require("./graphical_state.js");
live_score.Musical_state   = require("./musical_state.js");
live_score.Renderer        = require("./renderer.js");
live_score.Midi_player     = require("./midi_player.js");

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

  /**
  * Allows for playback of the notes rendered in the score
  */
  this.midi_player = new live_score.Midi_player();

  this.create_empty_score();
};

/**
* create_empty_score
*   creates one stave with four empty measures
* args
*   none
* returns
*   none
*/
live_score.Score_editor.prototype.create_empty_score = function(){
 
  var num_staves = 1; 
  var stave_info = live_score.structs.create_stave_info();
  stave_info.clef = "treble";

  this.ms.add_staves(num_staves,stave_info);
  
  var num_measures = 4;
  var measure_info = live_score.structs.create_measure_info();
  measure_info.num_beats = 4;
  measure_info.beat_value = 4;
  this.ms.add_measures(num_measures, measure_info);
  
  this.renderer.render_score(this.ms.staves);
  
  this.renderer.display_score();
  
  this.gs.update(this.renderer);
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
  var stave_info = live_score.structs.create_stave_info();
  stave_info.clef = "treble";
  this.ms.add_staves(stave_info);
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
  var measure_info = live_score.structs.create_measure_info();
  measure_info.num_beats = 4;
  measure_info.beat_value = 4;
  this.ms.add_measures(num_measures, measure_info);
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
  if(note_info.valid_input){
    var staves = this.ms.add_note(note_info);
    this.resize_score();
    this.renderer.render_score(staves);
    this.renderer.display_score();
    this.gs.update(this.renderer);
  }
};

/**
* remove_note
*   removes notes from the score
* args
*   event_info
*     information about the ui event, will be interpreted by Graphical_state
* returns
*   none
*/
live_score.Score_editor.prototype.remove_note = function(event_info){
 
  var note_info = this.gs.get_note_position(event_info);
  if(note_info.note_found){
    var staves = this.ms.remove_note(note_info);
    this.resize_score();
    this.renderer.render_score(staves);
    this.renderer.display_score();
    this.gs.update(this.renderer);
  }
};

live_score.Score_editor.prototype.play = function(event_info){
  var staves = this.ms.get_staves_array();
  this.midi_player.play(staves);
};

live_score.Score_editor.prototype.resize_score = function(){
  var spacing_constant = this.ms.get_num_independent_notes();
  var score_size = this.ui.resize_score_panel(spacing_constant);
  this.renderer.resize_score(score_size);
};

module.exports = live_score.Score_editor;
