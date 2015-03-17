live_score = require("./live_score.js");
//MIDI = require("../../support/MIDI.js");

live_score.Midi_player = function(){
  //console.log(MIDI.apis);
};

live_score.Midi_player.prototype.play = function(){
  console.log("play");
};

module.exports = live_score.Midi_player;
