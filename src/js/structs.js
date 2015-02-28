live_score = require("./live_score.js");
live_score.structs = {};

live_score.structs.create_stave_info = function(){
  return{
    clef:""
  };
};

live_score.structs.create_measure_info = function(){
  return{
    num_beats:0,
    beat_value:0
  };
};

live_score.structs.create_note_info = function(){
  return{
    stave_num:0,
    measure_num:0,
    pitch:0,
    x_position:0,
    y_position:0,
    note_length:0,
    quantization:0
  };
};

live_score.structs.create_event_info = function(){
  return{
    graphical_object: new live_score.Graphical_object(),
    ui_info: {} 
  };
};

live_score.structs.create_ui_info = function(){
  return{
    selected_note_length:0,
    quantization:0
  };
};

live_score.structs.shallow_copy = function(struct){
  var copy = {};
  for(var field in struct){
    copy[field] = struct[field];
  }
  return copy;
};

module.exports = live_score.structs;
