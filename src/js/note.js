live_score = require("./live_score.js");

/**
* Note
*   Constructor for the Note object. Contains information about any number of
*   notes that are played at a specific time
* args
*   pitch
*     the pitch of the note being played
*   length
*     the length of the note
*   type
*     denotes the type of note, either a rest or a musical note
* returns
*   none
*/
live_score.Note = function(pitch,length,type){
  
  /**
  * (see function description)
  */
  this.pitches = [];
  this.pitches.push({"pitch":pitch,"length":length,"type":type});
  
  /**
  * the length of notes as they will be displayed in the score
  */
  this.length = length;
 
  /**
  * (see function description)
  */
  this.type = type;
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

live_score.Note.prototype.add_note = function(note_info){
  var pitch = live_score.translate_midi_number_to_pitch(note_info.pitch);
  var length =  note_info.note_length;
  var type = live_score.note_type;
  this.pitches.push({"pitch":pitch,"length":length,"type":type});
};

live_score.Note.prototype.is_note = function(){
  return (this.type === live_score.note_type);
};

live_score.Note.prototype.is_rest = function(){
  return (this.type === live_score.rest_type);
};

module.exports = live_score.Note;
