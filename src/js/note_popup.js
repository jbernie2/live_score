live_score = require("./live_score.js");

/**
* Note_popup
*   a div that displays the value of the pitch that would be added
*   if the used was to click on their current position in the score
* args
*   none
* returns
*   none
*/
live_score.Note_popup = function(){
  
  /**
  * the html element
  */
  this.popup_div = document.createElement("div");
  this.set_style();
  document.body.appendChild(this.popup_div);
};

/**
* set_style
*   set css of the of the div
* args
*   none
* returns
*   none
*/
live_score.Note_popup.prototype.set_style = function(){
  this.popup_div.style.display = "none";
  this.popup_div.style.position = "absolute";
  this.popup_div.style.background = "#FAFAD2";
};

/**
* update
*   update the text of the div based on the mouse position
* args
*   event_info
*     a struct (see structs.js) with information about the ui event
*   note_info
*     a struct (see structs.js) with information about the note
* returns
*   none
*/ 
live_score.Note_popup.prototype.update = function(event_info, note_info){
  if(event_info.mouse_on_score && note_info.valid_input){
    var pitch = live_score.translate_midi_number_to_pitch(note_info.pitch);
    this.popup_div.innerHTML = pitch;
    this.popup_div.style.left = event_info.absolute_x + 10;
    this.popup_div.style.top = event_info.absolute_y - 20;
    this.popup_div.style.display = "";
  }else{
    this.popup_div.style.display = "none";
  }
};

module.exports = live_score.Note_popup;
