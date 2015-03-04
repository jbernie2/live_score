live_score = require("./live_score.js");

live_score.Graphical_stave = function(){
  this.bounds = new live_score.Graphical_object();
  this.measures = [];
};

live_score.Graphical_stave.prototype.extract_positional_info = function(stave,
  stave_contents){

  this.extract_stave_info(stave);
  var measure_contents = [];
  for(var i = 0; i < stave_contents.length; i++){
    var score_object = stave_contents[i];
    if(this.is_barline(score_object)){
      this.add_measure(score_object,measure_contents);
      measure_contents = [];
    }else{
      measure_contents.push(score_object);
    }
  } 
};

/**
* extract_stave_info
*   extracts positional information from the Vexflow object and 
*   uses that information to determine the positioning of a stave
* args
*   stave_object
*     an object representing a stave, created by Vexflow, that is displayed
*     in the score
* returns
*   none
*/
live_score.Graphical_stave.prototype.extract_stave_info = function(
  stave_object){
  this.bounds.start_x = stave_object.bounds.x;
  this.bounds.end_x = stave_object.bounds.x + stave_object.bounds.w;
  this.bounds.start_y = stave_object.bounds.y;
  this.bounds.end_y = stave_object.bounds.y + stave_object.height;
  this.bounds.space_between_notes = this.calculate_space_between_notes(
    stave_object);
};

/**
* is_barline
*   checks if a given score_object is a barline, used to determine the 
*   postions of measures
* args
*   score_object
*     an object, created by Vexflow that is displayed in the score
* returns
*   a boolean value denoting whether the score_object is a barline
*/
live_score.Graphical_stave.prototype.is_barline = function(score_object){
  return (score_object.noteType && 
          score_object.noteType === "n" && 
          score_object.duration === "b");
};

live_score.Graphical_stave.prototype.add_measure = function(){
  var gm = new live_score.Graphical_measure();
  var previous_gm = null;
  if(this.measures.length > 0){
    previous_gm = this.measures[this.measures.length - 1];
  }
  gm.extract_positional_info(previous_gm,score_object,measure_contents);
  this.measures.push(gm);
};

live_score.Graphical_stave.prototype.contains = function(graphical_object){
  return this.bounds.intersects_area(graphical_object);
};

/**
* lookup_measure
*   determines if the bounds of a graphical object overlap with the bounds of
*   a measure in the score
* args
*   graphical_object
*     a graphical_object containing the coordinates being checked against the
*     coordinates of the measures in the score
* returns
*     an integer denoting the index of the first measure that contains the 
*     position
*/
live_score.Graphical_stave.prototype.lookup_measure = function(graphical_object){
  var measure_found = false;
  for(var i = 0; i < this.measures.length && !measure_found; i++){
    measure_found = this.measures[i].contains(graphical_object);
  }
  return i - 1;
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
live_score.Graphical_stave.prototype.lookup_note = function(measure_num,
  graphical_object){
  var note_info = null;
  note_info = this.measures[i].lookup_note(graphical_object);
  return note_info;
};






