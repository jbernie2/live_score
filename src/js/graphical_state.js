live_score = require("./live_score.js");
live_score.Graphical_stave = require("./graphical_stave.js");
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
  var voice_list = renderer.get_voices();

  for(var i = 0; i < voice_list.length; i++){
    var stave_contents = [];
    var voice = voice_list[i];
    for(var j = 0; j < voice.length; j++){
      var voice_contents = voice[j].tickables;
      for(var k = 0; k < voice_contents.length; k++){
        voice_contents[k].stave = staves[i];
        stave_contents.push(voice_contents[k]);
      }
    }
    var graphical_stave = new live_score.Graphical_stave();
    graphical_stave.extract_positional_info(staves[i], stave_contents);
    this.staves.push(graphical_stave);
  }
}; 

/**
* get_note_info
*   queries the graphical_state to either determine the position of click
*   within the score, or determine whether a note had been clicked on
* args
*   graphical_object
*     a Graphical_object (See graphical_object.js) containing the coordinates
*     being looked up
*   is_new_note
*     a boolean denoting whether an existing note is being looked up, or a new
*     note is being added
* returns
*   note_info
*     information about the note that was looked up
*/
live_score.Graphical_state.prototype.get_note_info = function(graphical_object,
  is_new_note){
  
  var note_info = live_score.structs.create_note_info();
  var stave_found = false;
  for(var i = 0; i < this.staves.length && !stave_found; i++){
    if(this.staves[i].contains(graphical_object)){
      note_info.stave_num = i;
      stave_found = true;
      this.staves[i].get_note_info(graphical_object,note_info,is_new_note);
    }
  }
  note_info.stave_found = stave_found;
  note_info.valid_input = note_info.stave_found && note_info.measure_found;
  
  return note_info;
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
  
  var is_new_note = true;
  var note_info = this.get_note_info(event_info.graphical_object, is_new_note);
  note_info.note_length = event_info.note_length;
  note_info.quantization = event_info.quantization;

  return note_info;
};

/**
* get_note_position
*   determines if a position clicked in the score is a note
* args
*   event_info
*     a struct (see structs.js) containing information about the
*     ui event
* returns
*   note_info
*     a struct (see structs.js) containing information about whether the
*     position clicked contained a note
*/
live_score.Graphical_state.prototype.get_note_position = function(
  event_info){
 
  var is_new_note = false;
  var note_info = this.get_note_info(event_info.graphical_object, is_new_note);
  return note_info;
};

module.exports = live_score.Graphical_state;
