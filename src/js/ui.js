live_score = require("./live_score.js");
live_score.structs = require("./structs.js");
live_score.Score_panel = require("./score_panel.js");
live_score.Control_panel = require("./control_panel.js");
live_score.Note_popup = require("./note_popup.js");

/**
* Ui
*   Constructor for the Ui Object
* args
*   event_controller
*     an object to which the Ui passes event information after being
*     parsed
*   score_editor_div_id
*     the id of the div in which all the Ui elements are created
* returns
*   none
*/
live_score.Ui = function(event_controller, score_editor_div_id){

  /**
  * (see function description)
  */
  this.event_controller = event_controller;
  
  /**
  * (see function description)
  */
  this.score_editor_div_id = score_editor_div_id;

  /**
  * the html canvas element on which the score is drawn
  */
  this.score_editor_div = document.getElementById(score_editor_div_id);

  /**
  * a struct (see structs.js) that keeps track of the current state of the UI
  */
  this.ui_info = live_score.structs.create_ui_info();

  /**
  * the panel that contains the canvas on which the score is drawn 
  * (see score_panel.js)
  */
  this.score_panel = new live_score.Score_panel(event_controller,
    this.ui_info);

  /**
  * the panel that contains all the input controls (see control_panel.js)
  */
  this.control_panel = new live_score.Control_panel(this.ui_info);

  /**
  * the panel that contains all the play back options for the score
  */
  this.playback_panel  = new live_score.Playback_panel(event_controller);

  /**
  *
  */
  this.note_popup = new live_score.Note_popup();
};

/**
* get_score_panel
*   a getter for the score_panel 
* args
*   none
* returns
*   the score_panel
*/
live_score.Ui.prototype.get_score_panel = function(){
  return this.score_panel.score_canvas;
};

live_score.Ui.prototype.resize_score_panel = function(spacing_constant){
  return this.score_panel.resize_score_panel(spacing_constant);
};

live_score.Ui.prototype.update_note_popup = function(event_info, note_info){
  this.note_popup.update(event_info, note_info);
};

module.exports = live_score.Ui;
