live_score      = require("./live_score.js");
live_score.Note = require("./note.js");

live_score.Measure = function(measure_meta_data){
  this.num_beats = measure_meta_data.num_beats;
  this.beat_value = measure_meta_data.beat_value;
  this.notes = [];
  this.create_empty_measure();
};

live_score.Measure.prototype.create_empty_measure = function(){
  var remaining_beats = this.num_beats;
  while(remaining_beats > 0){
    var rest_length = this.optimal_rest_length(remaining_beats);
    remaining_beats = this.num_beats * ((this.num_beats/this.beat_value) - 
      (1/rest_length)); 
    this.notes.push(new live_score.Note(live_score.rest_pitch,rest_length,
      live_score.rest_type));
  }
};

live_score.Measure.prototype.optimal_rest_length = function(remaining_beats){
  var best_fit = this.num_beats/this.beat_value;
  var best_fit_note = null;
  for(var note_name in live_score.note_lengths){
    var note_length = live_score.note_lengths[note_name];
    var current_fit = (this.num_beats/this.beat_value) - (1/note_length);
    if(current_fit < best_fit && current_fit >= 0){
      best_fit = current_fit;
      best_fit_note = note_length;
    }
  }
  return best_fit_note;
};

module.exports = live_score.Measure;
