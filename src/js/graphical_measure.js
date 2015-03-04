live_score = require("./live_score.js");

live_score.Graphical_measure = function(){
  this.bounds = new live_score.Graphical_object();
  this.notes = [];
};

live_score.Graphical_measure.prototype.extract_positional_info = function(
  previous_measure,current_measure,measure_contents){
  
  this.extract_measure_info(previous_measure,current_measure);
    
  var measure_position = 0;
  for(var i = 0; i < measure_contents.length; i++){
    var score_object = measure_contents[i];
    if(this.is_note(score_object)){
      this.add_note(score_object,measure_position);   
    }
    measure_position += live_score.note_length_to_ticks(score_object.duration);
  } 
};

/**
* extract_measure_info
*   extracts positional information from the Vexflow object and 
*   uses that information to determine the positioning of a measure
* args
*   previous_measure
*     a graphical_object containing the bounds of the previous measure
*   current_measure
*     an object representing a barline, created by Vexflow, that is displayed
*     in the score
* returns
*   none
*/
live_score.Graphical_measure.prototype.extract_measure_info = function(
  previous_measure,current_measure){
  
  if(previous_measure === null){
    this.bounds.start_x = current_measure.stave.start_x;
  }else{
    measure_area.start_x = previous_measure.end_x + 1;
  } 
  measure_area.end_x = current_measure.getAbsoluteX();
  measure_area.start_y = current_measure.stave.bounds.y;
  measure_area.end_y = current_measure.stave.bounds.y + 
                        current_measure.stave.height; 
};

/**
* is_note
*   checks if a given score_object is a note
* args
*   score_object
*     an object, created by Vexflow that is displayed in the score
* returns
*   a boolean value denoting whether the score_object is a note
*/
live_score.Graphical_measure.prototype.is_note = function(score_object){
  return (score_object.noteType && 
          score_object.noteType === "n" && 
          score_object.duration !== "b");
};

live_score.Graphical_measure.prototype.add_note = function(note_object,
  measure_position){

  for(var i = 0; i < note_object.note_heads.length; i++){
    var note_head = note_object.note_heads[i];
    var pitch = note_object.keys[i];

    var gn = new live_score.graphical_note();
    gn.extract_positional_info(score_object,measure_position,pitch);

    this.notes.push(gn);
  }
};

live_score.Graphical_measure.prototype.contains = function(graphical_object){
  return this.bounds.intersects_area(graphical_object);
};

/**
* lookup_note
*   determines if the bounds of a graphical object overlap with the position
*   of a note in the score
* args
*   graphical_object
*     a graphical_object containing the coordinates being checked against the
*     coordinates of the notes in the score
* returns
*   note_info
*     a struct, described in structs.js, with information about the note
*/
live_score.Graphical_measure.prototype.lookup_note = function(graphical_object){
  var note_info = null;
  for(var i = 0; i < this.notes.length && !note_info; i++){
    if(this.notes[i].contains(graphical_object)){
      note_info = this.notes[i].get_note_info();
    }
  }
  return note_info;
};

