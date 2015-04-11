live_score = require("./live_score.js");

live_score.Note_popup = function(){
  this.popup_div = document.createElement("div");
  this.set_style();
  document.body.appendChild(this.popup_div);
};

live_score.Note_popup.prototype.set_style = function(){
  this.popup_div.style.display = "none";
  this.popup_div.style.position = "absolute";
  this.popup_div.style.background = "#FAFAD2";
};
  
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
