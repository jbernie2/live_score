live_score = require("./live_score.js");

/**
* Playback_panel
*   ui element containing all the midi playback controls
* args
*   event_controller
*     the object that handles all ui events
* returns
*   none
*/
live_score.Playback_panel = function(event_controller){

  /**
  * (see function description)
  */
  this.event_controller = event_controller;

  /**
  * the html button for playing the notes in the score
  */
  this.play_button = document.getElementById("play_button");
  this.play_button.onclick = this.play();

};

/**
* play
*   plays the notes in the score
* args
*   none
* returns
*   none
*/
live_score.Playback_panel.prototype.play = function(){
  event_controller = this.event_controller;
  return function(){
    event_controller.play();
  };
};

module.exports = live_score.Playback_panel;
