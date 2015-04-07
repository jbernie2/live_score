live_score = require("./live_score.js");
live_score.structs = {};

/**
* create_stave_info
*   creates a stave_info struct, used when creating a new measure
* args
*   none
* returns
*   a stave_info struct
*/
live_score.structs.create_stave_info = function(){
  return{
    /**
    * the clef of the stave
    */
    clef:""
  };
};

/**
* create_measure_info
*   creates a measure_info struct, used when adding measures to a stave
* args
*   none
* returns
*   a measure_info struct
*/
live_score.structs.create_measure_info = function(){
  return{
    /**
    * the total number of beats in the measure
    */
    num_beats:0,

    /**
    * the note length of each of the beats
    */
    beat_value:0
  };
};

/**
* create_note_info
*   creates a note_info struct, used when adding a note to the score
* args
*   none
* returns
*   a note_info struct
*/
live_score.structs.create_note_info = function(){
  return{
    /**
    * the stave number the note is going to be inserted into
    */
    stave_num:0,

    /**
    * the measure number the note is going to be inserted into
    */
    measure_num:0,

    /**
    * the pitch, as a midi number, of the note
    */
    pitch:0,

    /**
    * the y position of the note as the distance from the highest possible note
    * in the stave
    */
    y_position:0,

    /**
    * the length of the note being inserted
    */
    note_length:0,

    /**
    * the length of the note as it will be displayed in the score (can differ
    * from the note_length)
    */
    display_length:0,

    /**
    * the longest possible length the note can take up without overlapping with
    * an adjacent note
    */
    max_length:0,

    /**
    * the beat level to which the note will be quantized before being inserted
    */
    quantization:0,

    /**
    * the number of ticks (rhythmic units) that have occurred before this note
    * in the containing measure
    */
    tick_position:0,

    /**
    * the number of ticks (rhythmic units) that have occurred before this note
    * in the containing measure, quantized to a given beat level
    */
    quantized_tick_position:0,
 
    /**
    * the position of the note in the measure in terms of beat that it lands on
    */
    beat_level:0,
    
    /**
    * a boolean denoting whether a note was found at a given position
    */
    note_found:0,

    /**
    * a boolean denoting whether an inserted note is within the musical bounds
    * of the containing stave/measure
    */
    valid_input:0
  };
};

/**
* create_event_info
*   creates a event_info struct, used for ui actions
* args
*   none
* returns
*   an event_info struct
*/
live_score.structs.create_event_info = function(){
  return{
    /**
    * the graphical object containing a point or area on the score
    */
    graphical_object: new live_score.Graphical_object(),
 
    /**
    * the length of the note being inserted
    */
    note_length:0,

    /**
    * the beat level to which the note will be quantized before being inserted
    */
    quantization:0,
  };
};

/**
* create_ui_info
*   creates a ui_info struct, used to pass along the state of the ui
* args
*   none
* returns
*   a ui_info struct
*/
live_score.structs.create_ui_info = function(){
  return{
    /**
    * the note length currently selected in the ui
    */
    note_length:0,
    
    /**
    * the quantization level currently selected in the ui
    */
    quantization:0,

    /**
    * denotes whether notes are being added or removed
    */
    input_mode:""
  };
};

live_score.structs.create_midi_note_info = function(){
  return{
    channel:0,
    note_number:0,
    velocity:0,
    note_on:0,
    note_off:0
  };
};

live_score.structs.create_key_info = function(){
  return{
    key:"",
    sharps:[],
    flats:[],
    naturals:[],
    double_sharps:[],
    double_flats:[]
  };
};

/**
* shallow_copy
*   creates a shallow copy of a struct
* args
*   struct
*     the struct to be copied
* returns
*   copy
*     a copy of the struct passed as an argument
*/
live_score.structs.shallow_copy = function(struct){
  var copy = {};
  for(var field in struct){
    copy[field] = struct[field];
  }
  return copy;
};

module.exports = live_score.structs;
