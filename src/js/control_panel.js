live_score = require("./live_score.js");

live_score.Control_panel = function(ui_info){

  this.ui_info = ui_info;
  
  this.insert_note_button = document.getElementById("insert_note");
  this.insert_note_button.onclick = this.set_input_mode(
    live_score.insert_mode);

  this.remove_note_button = document.getElementById("remove_note");
  this.remove_note_button.onclick = this.set_input_mode(
    live_score.remove_mode);
 
  this.set_control_defaults();
};

live_score.Control_panel.prototype.set_control_defaults = function(){
  this.ui_info.note_length = live_score.note_lengths.quarter;
  this.ui_info.quantization = live_score.note_lengths.quarter;
  this.ui_info.input_mode = live_score.insert_mode;
};

live_score.Control_panel.prototype.set_input_mode = function(input_mode){
  var ui_info = this.ui_info;
  return function(){
    ui_info.input_mode = input_mode;
  };
};

module.exports = live_score.Control_panel;
