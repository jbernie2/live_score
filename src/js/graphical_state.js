live_score = require("./live_score.js");
live_score.structs = require("./structs.js");

/**
* Graphical_state
*   Constructor for the Graphical_state object, which contains all the
*   positional information about the musical information in the score.
*   It is responsible for scraping positional information from Vexflow
*   and for figuring out which elements are being acted on by the user
*   through translating Ui events into a format which can be
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
  * x,y positioning information about notes on the canvas, utilizes the 
  * Graphical_object object.
  */
  this.notes = [];
};

/**
* clear_state
*   each time the score changes, the positional information changes as
*   well. The old information needs to be cleared each time the new
*   positional information is read
* args
*   none
* returns
*   none
*/
live_score.Graphical_state.prototype.clear_state = function(){
  this.staves = [];
  this.measures = [];
  this.notes = []; 
};

/**
* update
*   scrapes the information from the Vexflow score created by the renderer
*   updates the positional information of the staves, measures and notes.
* args
*   renderer
* returns
*   none
*/
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

/**
* format_score_contents
*   flattens the object returned from renderer into an array of objects
*   from which positional information can be easily extracted. Also
*   sets the correct stave for each score_object
* args
*   staves
*     a list of the score's staves
*   voice_list
*     a list of all the score's voices
* returns
*   none
*/
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

/**
* is_note
*   checks if a given score_object is a note
* args
*   score_object
*     an object, created by Vexflow that is displayed in the score
* returns
*   a boolean value denoting whether the score_object is a note
*/
live_score.Graphical_state.prototype.is_note = function(score_object){
  return (score_object.noteType && 
          score_object.noteType === "n" && 
          score_object.duration !== "b");
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
live_score.Graphical_state.prototype.is_barline = function(score_object){
  return (score_object.noteType && 
          score_object.noteType === "n" && 
          score_object.duration === "b");
};

/**
* add_note
*   extracts positional information from the Vexflow object and 
*   places that information into an array of all the other notes
* args
*   note_object
*     an object representing a note, created by Vexflow, that is displayed
*     in the score
* returns
*   none
*/
live_score.Graphical_state.prototype.add_note = function(note_object){
  
  for(var i = 0; i < note_object.note_heads.length; i++){
    var note_area = new live_score.Graphical_object();
    var note_head = note_object.note_heads[i];

    note_area.start_x = note_head.x;
    note_area.end_x = note_area.start_x + note_head.glyph.head_width;
    note_area.start_y = note_head.y;
    note_area.end_y = note_area.start_y + note_head.stave.
      getSpacingBetweenLines();

    this.notes.push(note_area);
  }
};

/**
* add_measure
*   extracts positional information from the Vexflow object and 
*   uses that information to determine the positioning of a measure
* args
*   barline_object
*     an object representing a barline, created by Vexflow, that is displayed
*     in the score
* returns
*   none
*/
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

/**
* add_stave
*   extracts positional information from the Vexflow object and 
*   uses that information to determine the positioning of a stave
* args
*   stave_object
*     an object representing a stave, created by Vexflow, that is displayed
*     in the score
* returns
*   none
*/
live_score.Graphical_state.prototype.add_stave = function(stave_object){
  var stave_area = new live_score.Graphical_object();
  
  stave_area.start_x = stave_object.bounds.x;
  stave_area.end_x = stave_object.bounds.x + stave_object.bounds.w;
  stave_area.start_y = stave_object.bounds.y;
  stave_area.end_y = stave_object.bounds.y + stave_object.height;
  stave_area.space_between_notes = this.calculate_space_between_notes(
    stave_object);
   this.staves.push(stave_area);
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
live_score.Graphical_state.prototype.calculate_space_between_notes = 
  function(stave_object){
  
  var num_diatonic_notes = 8;
  var num_chromatic_notes = 12;
  var space_between_diatonic_notes = stave_object.getSpacingBetweenLines()/2;
  var space_between_chromatic_notes = Math.floor(
    (space_between_diatonic_notes * num_diatonic_notes)/num_chromatic_notes);
  return space_between_chromatic_notes;
};

/**
* lookup_note
*   determines if the bounds of a graphical object overlap with the position
*   of a note in the score
* args
*   position
*     a graphical_object containing the coordinates being checked against the
*     coordinates of the notes in the score
* returns
*   note_found
*     a boolean denoting if the position is contained within a note
*/
live_score.Graphical_state.prototype.lookup_note = function(position){
  var note_found = false;
  for(var i = 0; i < this.notes.length && !note_found; i++){
    note_found = this.notes[i].intersects_area(position);
  }
  return note_found;
};

/**
* lookup_measure
*   determines if the bounds of a graphical object overlap with the bounds of
*   a measure in the score
* args
*   position
*     a graphical_object containing the coordinates being checked against the
*     coordinates of the measures in the score
* returns
*     an integer denoting the index of the first measure that contains the 
*     position
*/
live_score.Graphical_state.prototype.lookup_measure = function(position){
  var measure_found = false;
  for(var i = 0; i < this.measures.length && !measure_found; i++){
    measure_found = this.measures[i].intersects_area(position);
  }
  return i-1;
};

/**
* lookup_stave
*   determines if the bounds of a graphical object overlap with the bounds of
*   a stave in the score
* args
*   position
*     a graphical_object containing the coordinates being checked against the
*     coordinates of the staves in the score
* returns
*     an integer denoting the index of the first stave that contains the 
*     position
*/
live_score.Graphical_state.prototype.lookup_stave = function(position){
  var stave_found = false;
  for(var i = 0; i < this.staves.length && !stave_found; i++){
    stave_found = this.staves[i].intersects_area(position);
  }
  return i-1;
};

/**
* get_measure_position
*   determines where within a measure a given position is located, this
*   is used to determine the final x position of the click in relation to
*   other notes in the score
* args
*   measure_num
*     the index of the first measure that overlaps with graphical_object
*     position
*   position
*     a graphical_object containing the coordinates being checked 
* returns
*   fractional_x_position
*     the percentage of the way through the measure that the position starts
*/
live_score.Graphical_state.prototype.get_measure_position = 
  function(measure_num,position){
  var containing_measure = this.measures[measure_num];
  var measure_length = containing_measure.end_x - containing_measure.start_x;
  var position_in_measure = position.start_x - containing_measure.start_x;
  var fractional_x_position = position_in_measure/measure_length;
  return fractional_x_position;
};

/**
* get_note_position
*   determines where within a stave a given position is located, this
*   is used to determine the final y position of the click in relation to
*   other notes in the score
* args
*   stave_num
*     the index of the first stave that overlaps with graphical_object
*     position
*   position
*     a graphical_object containing the coordinates being checked 
* returns
*   note_distance_from_top
*     the distance, in chromatic notes, that a given position is from the
*     highest possible note in a stave
*/
live_score.Graphical_state.prototype.get_note_position = 
  function(stave_num,position){
  var containing_stave = this.staves[stave_num];
  var y_position_in_stave =  position.start_y - containing_stave.start_y;
  var note_distance_from_top = y_position_in_stave/
    containing_stave.space_between_notes;
  note_distance_from_top = Math.round(note_distance_from_top);
  return note_distance_from_top;
};

live_score.Graphical_state.prototype.get_score_position = function(event_info){

};

/**
* get_new_note_position
*   determines the stave, measure, and x,y positioning of a new note
*   being inserted into the score
* args
*   event_info
*     a struct, described in structs.js, containing information about the
*     ui event
* returns
*   note_info
*     a struct, described in structs.js, containing information about the
*     where the new note will be inserted into the score
*/
live_score.Graphical_state.prototype.get_new_note_position = function(
  event_info){
  
  var click_area = event_info.graphical_object;
  var note_info = live_score.structs.create_note_info();
  note_info.stave_num = this.lookup_stave(click_area);
  note_info.measure_num = this.lookup_measure(click_area);
  note_info.x_position = this.get_measure_position(note_info.measure_num,
    click_area);
  note_info.y_position = this.get_note_position(note_info.stave_num,
    click_area);
  note_info.note_length = event_info.note_length;
  note_info.quantization = event_info.quantization;

  return note_info;
};

module.exports = live_score.Graphical_state;
