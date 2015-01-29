live_score.Measure = function(measure_meta_data){
  this.num_beats = measure_meta_data.num_beats;
  this.beat_value = measure_meta_data.beat_value;
  this.notes = [];
  this.create_empty_measure();
};

live_score.Measure.prototype.create_empty_measure = function(){
  var remaining_beats = this.num_beats;
  while(remaining_beats > 0){
    this.notes.push(this.optimal_rest_fill(remaining_beats);
  }
};

live_score.Measure.prototype.optimal_rest_fill = function(remaining_beats){

  for(var note_length in live_score.note_lengths){
     
  }

};
