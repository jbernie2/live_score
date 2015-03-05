live_score = require("./live_score.js");

live_score.Graphical_stave = function(){
  this.bounds = new live_score.Graphical_object();
  this.space_between_notes = 0;
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
  this.space_between_notes = this.calculate_space_between_notes(
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

/**
* calculate_space_between_notes
*   calculates the space (in pixels) between two adjacent chromatic notes
*   in a stave
* args
*   stave_object
*     an object representing a stave, created by Vexflow, that is displayed
*     in the score
* returns
*   space_between_chromatic_notes
*     the space between two adjacent chromatic notes in the stave
*/
live_score.Graphical_stave.prototype.calculate_space_between_notes = 
  function(stave_object){
  
  var num_diatonic_notes = 8;
  var num_chromatic_notes = 12;
  var space_between_diatonic_notes = stave_object.getSpacingBetweenLines()/2;
  var space_between_chromatic_notes = Math.floor(
    (space_between_diatonic_notes * num_diatonic_notes)/num_chromatic_notes);
  return space_between_chromatic_notes;
};

live_score.Graphical_stave.prototype.add_measure = function(score_object,
  measure_contents){
  
  var gm = new live_score.Graphical_measure();
  var previous_gm = null;
  if(this.measures.length > 0){
    previous_gm = this.measures[this.measures.length - 1].bounds;
  }
  gm.extract_positional_info(previous_gm,score_object,measure_contents);
  this.measures.push(gm);
};

live_score.Graphical_stave.prototype.contains = function(graphical_object){
  return this.bounds.intersects_area(graphical_object);
};

/**
* get_note_info
*   determines if the bounds of a graphical object overlap with the bounds of
*   a measure in the score
* args
*   graphical_object
*     a graphical_object containing the coordinates being checked against the
*     coordinates of the measures in the score
*   note_info
*     struct, described in structs.js, that contains the results of the lookup
* returns
*     none
*/
live_score.Graphical_stave.prototype.get_note_info = function(graphical_object,
  note_info,is_new_note){

  if(is_new_note){
    note_info.y_position = this.get_measure_position_y(graphical_object);
  }

  var measure_found = false;
  for(var i = 0; i < this.measures.length && !measure_found; i++){
    if(this.measures[i].contains(graphical_object)){
      note_info.measure_num = i;
      measure_found = true;
      this.measures[i].get_note_info(graphical_object,note_info,is_new_note);
    }
  }
};

/**
* get_note_distance
*   determines where within a stave a given position is located, this
*   is used to determine the final y position of the click in relation to
*   other notes in the score
* args
*   graphical_object
*     coordinates of the note being checked 
* returns
*   note_distance_from_top
*     the distance, in chromatic notes, that a given position is from the
*     highest possible note in a stave
*/
live_score.Graphical_stave.prototype.get_measure_position_y = function(
  graphical_object){
  var y_position_in_stave =  graphical_object.start_y - this.bounds.start_y;
  var note_distance_from_top = y_position_in_stave / this.space_between_notes;
  note_distance_from_top = Math.round(note_distance_from_top);
  return note_distance_from_top;
};
