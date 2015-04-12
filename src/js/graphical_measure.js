live_score = require("./live_score.js");
live_score.Graphical_object = require("./graphical_object.js");
live_score.Graphical_note = require("./graphical_note.js");

/**
* Graphical_measure
*   stores positional information about the measured displayed in the score
* args
*   none
* returns
*   none
*/
live_score.Graphical_measure = function(){

  /**
  * a Graphical_object (see graphical_object.js) containing the coordinate 
  * boundaries of a measure
  */
  this.bounds = new live_score.Graphical_object();
  
  /**
  * an array of Graphical_note objects (see graphical_note.js) representing the
  * notes contained in this measure
  */
  this.notes = [];

   /**
  * an array of Graphical_note objects (see graphical_note.js) representing the
  * rests contained in this measure
  */
  this.rests = [];

  /**
  * The union of the notes and rests arrays
  */
  this.score_objects = [];

  /**
  * The number of ticks in this measure as defined by live_score.RESOLUTION
  */
  this.num_ticks = 0;
};

/**
* extract_posiitonal_info
*   takes vexflow objects and determines where they are rendered on the score
* args
*   previous_measure
*     a graphical_object containing the bounds of the previous measure
*   current_measure
*     an object representing a barline, created by Vexflow, that is displayed
*     in the score
*   measure_contents
*     an array of vexflow objects rendered within the bounds of the measure
* returns
*   none
*/
live_score.Graphical_measure.prototype.extract_positional_info = function(
  previous_measure,current_measure,measure_contents){
  
  this.extract_measure_info(previous_measure,current_measure);
    
  var measure_position = 0;
  for(var i = 0; i < measure_contents.length; i++){
    var score_object = measure_contents[i];
    if(this.is_note(score_object)){
      this.add_note(score_object,measure_position);   
    }else if(this.is_rest(score_object)){
      this.add_rest(score_object,measure_position);
    }
    measure_position += live_score.note_length_to_ticks(score_object.duration);
  }
  this.num_ticks = measure_position; 
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
    this.bounds.start_x = previous_measure.end_x + 1;
  } 
  this.bounds.end_x = current_measure.getAbsoluteX();
  this.bounds.start_y = current_measure.stave.bounds.y;
  this.bounds.end_y = current_measure.stave.bounds.y + 
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

/**
* is_rest
*   checks if a given score_object is a rest
* args
*   score_object
*     an object, created by Vexflow that is displayed in the score
* returns
*   a boolean value denoting whether the score_object is a rest
*/
live_score.Graphical_measure.prototype.is_rest = function(score_object){
  return (score_object.noteType && 
          score_object.noteType === "r" && 
          score_object.duration !== "b");
};

/**
* add_note
*   adds a Graphical_note (see Graphical_note.js) to the array of notes 
*   contained within the measure
* args
*   note_object
*     an object, created by Vexflow that is displayed in the score
*   measure_position
*     the starting position of the note being added (in ticks)
* returns
*   none
*/
live_score.Graphical_measure.prototype.add_note = function(note_object,
  measure_position){

  for(var i = 0; i < note_object.note_heads.length; i++){
    var note_head = note_object.note_heads[i];
    var pitch = note_object.keyProps[i].key + "/" + 
      note_object.keyProps[i].octave;

    var gn = new live_score.Graphical_note();
    gn.extract_positional_info(note_head,measure_position,pitch);

    this.notes.push(gn);
    this.score_objects.push(gn);
  }
};

/**
* add_note
*   adds a rest (see Graphical_note.js) to the array of rests
*   contained within the measure
* args
*   rest_object
*     an object, created by Vexflow that is displayed in the score
*   measure_position
*     the starting position of the rest being added (in ticks)
* returns
*   none
*/
live_score.Graphical_measure.prototype.add_rest = function(rest_object,
  measure_position){

  var gn = new live_score.Graphical_note();
  gn.extract_rest_info(rest_object,measure_position);
  this.rests.push(gn);
  this.score_objects.push(gn);
};

/**
* contains
*   checks if a set of coordinates is within the bounds of the measure
* args
*   graphical_object
*     a Graphical_object (see graphical_object.js) containing coordinates
* returns
*   a boolean of whether the area described by graphical_object overlaps with
*   the measure
*/
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
*   note_info
*     a struct, described in structs.js, with information about the note
* returns
*   none
*/
live_score.Graphical_measure.prototype.get_note_info = function(graphical_object,
  note_info, is_new_note){

  if(is_new_note){
    //note_info.x_position = this.get_measure_position_x(graphical_object);
    note_info.tick_position = this.get_measure_position_x(graphical_object);
  }else{
    var note_found = false;
    for(var i = 0; i < this.notes.length && !note_found; i++){
      if(this.notes[i].contains(graphical_object)){
        this.notes[i].get_note_info(note_info);
        note_found = true;
      }
    }
    note_info.note_found = note_found;
  }
};

/**
* get_measure_position_x
*   determines where within a measure a given position is located, this
*   is used to determine the final x position of the click in relation to
*   other notes in the score
* args
*   graphical_object
*     coordinates of the new note 
* returns
*   fractional_x_position
*     the percentage of the way through the measure that the position starts
*/
live_score.Graphical_measure.prototype.get_measure_position_x = function(
  graphical_object){
  
  /*
  var measure_length = this.bounds.end_x - this.bounds.start_x;
  var position_in_measure = graphical_object.start_x - this.bounds.start_x;
  var fractional_x_position = position_in_measure/measure_length;
  return fractional_x_position;
  */
  var previous_note = this.get_closest_note_before_position(graphical_object);
  var next_note = this.get_closest_note_after_position(graphical_object);
  var tick_position = this.calculate_tick_position(graphical_object,
    previous_note,next_note);
 
  return tick_position;
};

/**
* get_closest_note_before_position
*   finds the closest score object (note or rest), that appears in the score
*   prior to the point described by the graphical_object
* args
*   graphical_object
*     an object describing a point on the score (see graphical_object.js)
* returns
*   the graphical_object of the score object immediately preceding the
*   graphical_object passed in
*/
live_score.Graphical_measure.prototype.get_closest_note_before_position = 
  function(graphical_object){
  var closest_note;
  for(var i = 0; i < this.score_objects.length; i++){
    if(this.score_objects[i].before(graphical_object)){
      closest_note = this.score_objects[i];
    }
  }
  return closest_note;
};

/**
* get_closest_note_after_position
*   finds the closest score object (note or rest), that appears in the score
*   after the point described by the graphical_object
* args
*   graphical_object
*     an object describing a point on the score (see graphical_object.js)
* returns
*   the graphical_object of the score object immediately following the 
*   graphical_object passed in
*/
live_score.Graphical_measure.prototype.get_closest_note_after_position = 
  function(graphical_object){
  var closest_note;
  var closest_note_found = false;
  for(var i = 0; i < this.score_objects.length && !closest_note_found; i++){
    if(!this.score_objects[i].before(graphical_object)){
      closest_note = this.score_objects[i];
      closest_note_found = true;
    }
  }
  return closest_note;
};

/**
* calculate_tick_position
*   given a position and the notes directly preceding and following that
*   position, calculates the tick position in the measure of the position
* args
*   graphical_object
*     an object describing a point on the score (see graphical_object.js)
*   previous_note
*     the score object that immediately preceeds graphical_object in the
*     measure
*   next_note
*     the score object that immediately follows graphical_object in the
*     measure
* returns
*   new_note_tick_position
*     the position (in ticks) of the note being inserted into the measure
*/
live_score.Graphical_measure.prototype.calculate_tick_position = function(
  graphical_object,previous_note,next_note){
  
  if(previous_note === undefined){
    previous_note = {};
    previous_note.bounds = {};
    previous_note.bounds.start_x = this.bounds.start_x;
    previous_note.position = 0;
  }
  if(next_note === undefined){
    next_note = {};
    next_note.bounds = {};
    next_note.bounds.start_x = this.bounds.end_x;
    next_note.position = this.num_ticks;
  }

  var prev_note_x_pos = previous_note.bounds.start_x;
  var next_note_x_pos = next_note.bounds.start_x;
  var distance_between_adjacent_notes = next_note_x_pos - prev_note_x_pos;
  var new_note_relative_x_pos = graphical_object.start_x - prev_note_x_pos;
  var new_note_relative_fractional_x_pos = new_note_relative_x_pos/
    distance_between_adjacent_notes;
  var tick_distance_between_notes = next_note.position - 
    previous_note.position;
  var new_note_tick_position = previous_note.position + 
    (tick_distance_between_notes * new_note_relative_fractional_x_pos);

  return new_note_tick_position;
};

module.exports = live_score.Graphical_measure;
