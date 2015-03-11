live_score = require("./live_score.js");

/**
* Control_panel
*   Constructor for the live_score.Control_panel object, which contains all the
*   various buttons and controls for the UI
* args
*   ui_info
*     a struct (see structs.js) containing the current state of the ui
* returns
*   none
*/
live_score.Control_panel = function(ui_info){

  /**
  * (see function description)
  */
  this.ui_info = ui_info;
  
  /**
  * the button that sets the score's input mode to insert, allowing notes to be
  * added to the score
  */
  this.insert_note_button = document.getElementById("insert_note");
  this.insert_note_button.onclick = this.set_input_mode(
    live_score.insert_mode);

  /**
  * the button that sets the score's input mode to remove, allowing notes to be
  * removed from the score
  */
  this.remove_note_button = document.getElementById("remove_note");
  this.remove_note_button.onclick = this.set_input_mode(
    live_score.remove_mode);
 
  this.set_control_defaults();
};

/**
* set_control_defaults
*   sets the starting state of UI
* args
*   none
* returns
*   none
*/
live_score.Control_panel.prototype.set_control_defaults = function(){
  this.ui_info.note_length = live_score.note_lengths.quarter;
  this.ui_info.quantization = live_score.note_lengths.quarter;
  this.ui_info.input_mode = live_score.insert_mode;
};

/**
* set_input_mode
*   attaches a function to a button that when pressed sets the input mode
* args
*   input_mode
*     the value that the input mode gets set to when the button is pressed
* returns
*   none
*/
live_score.Control_panel.prototype.set_input_mode = function(input_mode){
  var ui_info = this.ui_info;
  return function(){
    ui_info.input_mode = input_mode;
  };
};

module.exports = live_score.Control_panel;
