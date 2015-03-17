live_score = require("./live_score.js");

live_score.Playback_panel = function(event_controller){

  this.event_controller = event_controller;

  this.play_button = document.getElementById("play_button");
  this.play_button.onclick = this.play();

};

live_score.Playback_panel.prototype.play = function(){
  event_controller = this.event_controller;
  return function(){
    event_controller.play();
  };
};

module.exports = live_score.Playback_panel;
