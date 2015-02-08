live_score = require("./live_score.js");

/**
* Graphical_state
*   Constructor for the Graphical_state object, which contains all the
*   positional information about the musical information in the score.
*   It is responsible for figuring out which elements are being acted on 
*   by the user through translating Ui events into a format which can be
*   understood by the Musical_state object
* args
*   none
* returns
*   none
*/
live_score.Graphical_state = function(){

  /**
  * x,y information about the position of staves on the canvas, utilizes the
  * Graphical_object object
  */
  this.staves = [];

  /**
  * x positioning information about the start and end of measures on the canvas
  * utilizes the Graphical_object object
  */
  this.measures = [];

  /**
  * x,y positioning information about notes on the canvas, utilized the 
  * Graphical_object object.
  */
  this.notes = [];
};

live_score.Graphical_state.prototype.clear_state = function(){
  this.staves = [];
  this.measures = [];
  this.notes = []; 
};

live_score.Graphical_state.prototype.update = function(renderer){
  this.clear_state();
  
  var staves = renderer.get_staves();
  var voices = renderer.get_voices();

  var score_contents = this.format_score_contents(staves, voices);
  for(var i = 0; i < score_contents.length; i++){
    var score_object = score_contents[i];
    if(this.is_note(score_object)){
      this.add_note(score_object);
    }else if(this.is_barline(score_object)){
      this.add_measure(score_object);
    }
  } 
  
  for(i = 0; i < staves.length; i++){
    this.add_stave(staves[i]);
  }
};

live_score.Graphical_state.prototype.format_score_contents = 
  function(staves, voice_list){
  var score_contents = [];
  for(var i = 0; i < voice_list.length; i++){
    var voice = voice_list[i];
    for(var j = 0; j < voice.length; j++){
      var voice_contents = voice[j].tickables;
      for(var k = 0; k < voice_contents.length; k++){
        voice_contents[k].stave = staves[i];
        score_contents.push(voice_contents[k]);
      }
    }
  }
  return score_contents;
};

live_score.Graphical_state.prototype.is_note = function(score_object){
  return (score_object.noteType && 
          score_object.noteType === "n" && 
          score_object.duration !== "b");
};

live_score.Graphical_state.prototype.is_barline = function(score_object){
  return (score_object.noteType && 
          score_object.noteType === "n" && 
          score_object.duration === "b");
};

live_score.Graphical_state.prototype.add_note = function(note_object){
  for(var i = 0; note_object.note_heads.length; i++){
    var note_area = new live_score.Graphical_object();
    var note_head = note_object.note_heads[i];
    var bounding_box = note_head.getBoundindBox;

    note_area.start_x = bounding_box.x;
    note_area.end_x = bounding_box.x + bouding_box.w;
    note_area.start_y = bounding_box.y;
    note_area.end_y = bounding_box.y + bouding_box.h;

    this.notes.push(note_area);
  }
};

live_score.Graphical_state.prototype.add_measure = function(barline_object){
  var measure_area = new live_score.Graphical_object();
  
  if(this.measures.length === 0){
    measure_area.start_x = barline_object.stave.start_x;
  }else{
    var previous_measure = this.measures[this.measures.length - 1];
    measure_area.start_x = previous_measure.end_x + 1;
  } 
  measure_area.end_x = barline_object.getAbsoluteX();
  measure_area.start_y = barline_object.stave.bounds.y;
  measure_area.end_y = barline_object.stave.bounds.y + 
                        barline_object.stave.height;
  
  this.measures.push(measure_area);
};

live_score.Graphical_state.prototype.add_stave = function(stave_object){
  var stave_area = new live_score.Graphical_object();
  
  stave_area.start_x = stave_object.bounds.x;
  stave_area.end_x = stave_object.bounds.x + stave_object.bounds.w;
  stave_area.start_y = stave_object.bounds.y;
  stave_area.end_y = stave_object.bounds.y + stave_object.height;

  this.staves.push(stave_area);
};

live_score.Graphical_state.prototype.get_score_position = function(event_info){

};

module.exports = live_score.Graphical_state;
