live_score = require("./live_score.js");

live_score.Note = function(pitch,length,type){
  this.pitch = [];
  this.pitch.push(pitch);
  this.length = length;
  this.type = type;
};

module.exports = live_score.Note;
