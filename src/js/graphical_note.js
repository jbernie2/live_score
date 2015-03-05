live_score = require("./live_score.js");
live_score.structs = require("./structs.js");

live_score.Graphical_note = function(){
  this.bounds = new live_score.Graphical_object();
  this.position = 0;
  this.pitch = "";
};

live_score.Graphical_note.prototype.extract_positional_info = function(note,
  measure_position,pitch){

  this.extract_note_info(note);
  this.position = measure_position;
  this.pitch = pitch;
};

live_score.Graphical_note.prototype.extract_note_info = function(note_head){

  this.bounds.start_x = note_head.x;
  this.bounds.end_x = this.bounds.start_x + note_head.glyph.head_width;
  this.bounds.start_y = note_head.y;
  this.bounds.end_y = this.bounds.start_y + note_head.stave.
    getSpacingBetweenLines();
};

live_score.Graphical_note.prototype.contains = function(graphical_object){
  return this.bounds.intersects_area(graphical_object);
};

live_score.Graphical_note.prototype.get_note_info = function(note_info){
  note_info.pitch = this.pitch;
  note_info.quantized_tick_position = this.position;
};
