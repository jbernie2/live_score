live_score = require("./live_score.js");
live_score.Graphical_object = require("./graphical_object.js");

/**
* Graphical_note
*   stores positional and musical information about a note displayed in the 
*   score
* args
*   none
* returns
*   none
*/
live_score.Graphical_note = function(){

  /**
  * a Graphical_object (see graphical_object.js) containing the coordinate 
  * boundaries of the note
  */
  this.bounds = new live_score.Graphical_object();

  /**
  * The number of ticks that have occurred in the measure before this note
  */
  this.position = 0;

  /**
  * The pitch of the note, formatted as follows D/5, D being the note, and 5 
  * being the octave
  */
  this.pitch = "";
};

/**
* extract_positional_info
*   named for the sake of continuity, sets the positional and musical values of
*   the note
* args
*   note
*     a vexflow note object from which positional information is extracted
*   measure_position
*     the number of ticks that have occurred in the measure before this note
*   pitch
*     the musical pitch of the note
* returns
*   none
*/
live_score.Graphical_note.prototype.extract_positional_info = function(note,
  measure_position,pitch){

  this.extract_note_info(note);
  this.position = measure_position;
  this.pitch = pitch;
};

/**
* extract_note_info
*   extracts positional data from the vexflow note_head object
* args
*   note_head
*     the vexflow object containing the graphical positioning information of
*     the note head of the note
* returns
*   none
*/
live_score.Graphical_note.prototype.extract_note_info = function(note_head){

  this.bounds.start_x = note_head.x;
  this.bounds.end_x = this.bounds.start_x + note_head.glyph.head_width;
  this.bounds.start_y = note_head.y - 
    (note_head.stave.getSpacingBetweenLines()/2);
  this.bounds.end_y = this.bounds.start_y + note_head.stave.
    getSpacingBetweenLines();
};

/**
* extract_rest_info
*   extracts positional data from the vexflow rest object
* args
*   rest_object
*     the vexflow object containing the graphical positioning information of
*     a rest
* returns
*   none
*/
live_score.Graphical_note.prototype.extract_rest_info = function(rest_object,
  measure_position){

  this.position = measure_position;
  this.bounds.start_x = rest_object.stem.x_begin;
  this.bounds.end_x = rest_object.stem.x_end;
};

/**
* contains
*   checks if a set of coordinates is within the bounds of the note
* args
*   graphical_object
*     a Graphical_object (see graphical_object.js) containing coordinates
* returns
*   a boolean of whether the area described by graphical_object overlaps with
*   the note
*/
live_score.Graphical_note.prototype.contains = function(graphical_object){
  return this.bounds.intersects_area(graphical_object);
};

/**
* contains
*   checks if a set of coordinates occurrs before this object in the score
* args
*   graphical_object
*     a Graphical_object (see graphical_object.js) containing coordinates
* returns
*   a boolean of whether the area described by graphical_object starts before
*   this object
*/
live_score.Graphical_note.prototype.before = function(graphical_object){
  return this.bounds.before_area(graphical_object);
};

/**
* get_note_info
*   fills in a note_info struct (see structs.js) with information about this
*   note, used for determining whether a given note was clicked on
* args
*   note_info
*     note_info struct (see structs.js) with information about this note
* returns
*   none
*/
live_score.Graphical_note.prototype.get_note_info = function(note_info){
  note_info.pitch = this.pitch;
  note_info.quantized_tick_position = this.position;
};

module.exports = live_score.Graphical_note;
