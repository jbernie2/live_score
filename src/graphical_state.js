live_score = require("./live_score.js");

live_score.Graphical_state = function(){
  this.staves = [];
  this.measures = [];
  this.notes = [];
};

live_score.Graphical_object = function(start_x,end_x,start_y,end_y){
  this.start_x = start_x;
  this.end_x = end_x;
  this.start_y = start_y;
  this.end_y = end_y;
};

live_score.Graphical_object.prototype.contains_coordinates = function(x,y){

};

module.exports = live_score.Graphical_state;
