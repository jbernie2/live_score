live_score.Voice = function(measure_meta_data){
  this.measures_info = measures_info;
  this.measures = [];
  this.create_empty_voice(measure_meta_data);
};

live_score.Voice.prototype.create_empty_voice = function(measure_meta_data){
  for(var i = 0; i < measure_meta_data.length; i++){
    this.measures.push(new live_score.Measure(measure_meta_data[i]));
  }
};
