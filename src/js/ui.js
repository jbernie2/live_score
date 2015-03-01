live_score = require("./live_score.js");
live_score.structs = require("./structs.js");
live_score.Score_panel = require("./score_panel.js");
live_score.Control_panel = require("./control_panel.js");

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

  this.ui_info = live_score.structs.create_ui_info();

  this.score_panel = new live_score.Score_panel(event_controller,
    this.ui_info);

  this.control_panel = new live_score.Control_panel(this.ui_info);

};

/*
live_score.Ui.prototype.attach_panel = function(ui_object){
  var panel = ui_object.get_panel();
  this.score_editor_div.appendChild(this.score_canvas);
};
*/

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

module.exports = live_score.Ui;
