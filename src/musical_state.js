live_score       = require("./live_score.js");
live_score.Stave = require("./stave.js");

live_score.Musical_state = function(){
  this.staves = [];
};


live_score.Musical_state.prototype.add_staves = function(stave_options){
  for(var i = 0; i < stave_options.length; i++){
    this.staves.push(new live_score.Stave(stave_options[i]));
  }
};

live_score.Musical_state.prototype.add_measures = function(num_measures,
  measure_options){
  for(var i = 0; i < this.staves.length; i++){
    this.staves[i].add_measures(num_measures, measure_options);
  }
};

module.exports = live_score.Musical_state;
