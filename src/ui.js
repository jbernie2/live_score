live_score = require("./live_score.js");

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

  this.initialize_ui_panels();
};

/**
* initialize_ui_panels
*   creates all the Ui elements
* args
*   none
* returns
*   none
*/
live_score.Ui.prototype.initialize_ui_panels = function(){
  this.initialize_score_panel();
};

/**
* initialize_score_panel
*   creates all the score panel, the ui element in which the score is drawn
* args
*   none
* returns
*   none
*/
live_score.Ui.prototype.initialize_score_panel = function(){
  this.score_panel = document.createElement('canvas');
  this.score_panel.id = 'score_panel';
  this.score_panel.width = 1000;
  this.score_panel.height = 500;

  this.score_editor_div.appendChild(this.score_panel);
};

module.exports = live_score.Ui;
