live_score         = require("./live_score.js");
live_score.Measure = require("./measure.js");

live_score.Voice = function(measure_meta_data){
  this.measure_meta_data = measure_meta_data;
  this.measures = [];
  this.create_empty_voice(measure_meta_data);
};

live_score.Voice.prototype.create_empty_voice = function(measure_meta_data){
  for(var i = 0; i < measure_meta_data.length; i++){
    this.measures.push(new live_score.Measure(measure_meta_data[i]));
  }
};

module.exports = live_score.Voice;
