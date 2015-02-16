live_score = require("./live_score.js");

/**
* Note
*   Constructor for the Note object. Contains information about any number of
*   notes that are played at a specific time
* args
*   pitch
*     the pitch of the note being played
*     TODO: this should really be an array since multiple notes can be
*     represented in a single Note object
*   length
*     the length of the note
*     TODO: should be an array since the notes be played can have different
*     lengths
*   type
*     denotes the type of note, either a rest or a musical note
* returns
*   none
*/
live_score.Note = function(pitch,length,type){
  
  /**
  * (see function description)
  */
  this.pitch = [];
  this.pitch.push(pitch);
  
  /**
  * (see function description)
  */
  this.length = length;
  
  /**
  * (see function description)
  */
  this.type = type;
};

live_score.Note.prototype.is_rest = function(){
  return (this.type === live_score.rest_type);
};

module.exports = live_score.Note;
