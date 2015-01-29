
live_score.Musical_state = function(){
  this.staves = [];
  this.add_staves([{clef:"treble"}]);
  this.add_measures(4,{num_beats:4, beat_value:4});
};

live_score.Musical_state.prototype.add_staves(stave_options){
  for(var i = 0; i < stave_options.length; i++){
    this.staves.push(new live_score.Stave(stave_options[i]));
  }
};

live_score.Musical_state.prototype.add_measures(num_measures,measure_options){
   for(var i = 0; i < num_measures; i++){
    this.staves[i].add_measures(measure_options);
  }
};


