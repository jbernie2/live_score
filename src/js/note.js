live_score = require("./live_score.js");

/**
* Note
*   Constructor for the Note object. Contains information about any number of
*   notes that are played at a specific time
* args
*   pitches
*     an array of the pitches being played and their properties
*   length
*     the length that will be used to display all the notes in the score
*   type
*     denotes the type of note, either a rest or a musical note
*   display_length
*     only relevant for notes, not rests, determines the length of the note
*     that will be rendered. This is so notes do not overlap eachother in the
*     displayed score. A note's display length can differ from the length
*     saved in pitches[]
* returns
*   none
*/
live_score.Note = function(pitch,length,type,display_length){
  
  /**
  * (see function description)
  */
  this.pitches = [];
  this.pitches.push({"pitch":pitch,"length":length,"type":type});
  
  /**
  * (see function description)
  */
  this.length = length;
 
  /**
  * (see function description)
  */
  this.type = type;

  /**
  * (see function description)
  */
  if(display_length && display_length !== 0){
    this.length = display_length;
  }
};

/*
live_score.Note.prototype.adjust_display_length = function(space_to_fill){
  var best_fit_length = 0;
  var least_space_remaining = space_to_fill;
  for(var i = 0; i < this.notes.length; i++){
    var note_length = live_score.note_length_to_ticks(this.notes[i].length);
    var space_remaining = 
  }
};
*/

/**
* add_note
*   adds a note to the pitches array
* args
*   note_info
*     a struct, described in structs.js, with information about the note being
*     inserted
* returns
*   none
*/
live_score.Note.prototype.add_note = function(note_info){
  var pitch = live_score.translate_midi_number_to_pitch(note_info.pitch);
  var length =  note_info.note_length;
  var type = live_score.note_type;
  this.pitches.push({"pitch":pitch,"length":length,"type":type});
};

/**
* remove_note
*   attemps to remove note from measure
* args
*   note_info
*     a struct (see structs.js) that contiains information about the
*     note being removed
* returns
*   is_empty
*     a boolean denoting whether there are any notes left at this position
*/
live_score.Note.prototype.remove_note = function(note_info){
  var pitch = note_info.pitch;
  var is_empty = false;

  for(var i = 0; i < this.pitches.length; i++){
    if(this.pitches[i].pitch === pitch){
      this.pitches.splice(i,1);
    }
  }
  if(this.pitches.length === 0){
    is_empty = true;
  }
  return is_empty;
};

/**
* is_note
*   checks if this Note object contains notes or rests
* args
*   none
* returns
*   a boolean that is true if there are notes in this object
*/
live_score.Note.prototype.is_note = function(){
  return (this.type === live_score.note_type);
};

/**
* is_note
*   checks if this Note object contains notes or rests
* args
*   none
* returns
*   a boolean that is true if there is a rest in this object
*/
live_score.Note.prototype.is_rest = function(){
  return (this.type === live_score.rest_type);
};

/**
* remove_note
*   makes the note render as a rest
* args
*   none
* returns
*   none
*/
live_score.Note.prototype.make_rest = function(){
  var pitch = live_score.rest_pitch;
  this.type = live_score.rest_type;
  this.pitches.push({"pitch":pitch,"length":length,"type":this.type});
};

live_score.Note.prototype.get_pitches = function(){
  var pitches = [];
  for(var i = 0; i < this.pitches.length; i++){
    pitches.push({
      "pitch":this.pitches[i].pitch,
      "length":this.pitches[i].length,
      "type":this.pitches[i].type,
      "display_length":this.length
    });
  }
  return pitches;
};

module.exports = live_score.Note;
