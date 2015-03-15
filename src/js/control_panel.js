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
 
  /**
  * drop down menu that allows for selection of the note length
  */
  this.note_select = document.getElementById("note_select");
  this.note_select.onchange = this.set_note_length();
 
  /**
  * drop down menu that allows for selection of the quantization size
  */
  this.quantization_select = document.getElementById("quantization_select");
  this.quantization_select.onchange = this.set_quantization();

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
  
  var note_length = parseInt(this.note_select.value,10);
  var quantization = parseInt(this.quantization_select.value,10);
  
  this.ui_info.note_length = note_length;
  this.ui_info.quantization = quantization;
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

/**
* set_note_length
*   attaches a function to the note selection drop down menu. The function
*   sets the length of the note to be inserted
* args
*   none
* returns
*   none
*/
live_score.Control_panel.prototype.set_note_length = function(){
  var ui_info = this.ui_info;
  return function(){
    var note_length = parseInt(this.value,10);
    ui_info.note_length = note_length;
  };
};

/**
* set_quantization
*   attaches a function to the quantization selection drop down menu. The 
*   function sets the quantization level
* args
*   none
* returns
*   none
*/
live_score.Control_panel.prototype.set_quantization = function(){
  var ui_info = this.ui_info;
  return function(){
    var quantization = parseInt(this.value,10);
    ui_info.quantization = quantization;
  };
};

module.exports = live_score.Control_panel;
