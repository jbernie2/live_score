live_score       = require("./live_score.js");
live_score.Voice = require("./voice.js");

live_score.Stave = function(stave_options){
  this.clef = stave_options.clef;
  this.voices = [];
  this.measure_meta_data = [];
};

live_score.Stave.prototype.add_measures = function(num_measures,
  measure_options){
  
  this.add_measure_meta_data(num_measures,measure_options);

  if(this.voices.length === 0){
    var new_voice = new live_score.Voice(this.measure_meta_data);
    this.voices.push(new_voice);
  }
  else{
    for(var i = 0; i < voices.lengths; i++){
      this.voices[i].add_measures(num_measures,measure_options);
    }
  }
};

live_score.Stave.prototype.add_note = function(note_info){
  var note_added = false;
  var current_voice = 0;
  while(!note_added && current_voice < this.voices.length){
    note_added = this.voices[current_voice].add_note(note_info);
    current_voice += 1;
  }
  if(!note_added){
    var new_voice = new live_score.Voice(this.measure_meta_data);
    new_voice.add_note(note_info);
    this.voices.push(new_voice);
  }
};

live_score.Stave.prototype.add_measure_meta_data = function(num_measures,
  measure_options){
  for(var i = 0; i < num_measures; i++){
    this.measure_meta_data.push(measure_options);
  }
};

live_score.Stave.prototype.get_total_num_beats = function(){

  var total_beats = 0;
  for(var i = 0; i < this.measure_meta_data.length; i++){
    var num_beats = this.measure_meta_data[i].num_beats;
    var beat_value = this.measure_meta_data[i].beat_value;

    total_beats += (num_beats * (live_score.note_lengths.quarter/beat_value));
  }
  total_beats = Math.ceil(total_beats);

  return total_beats;
};

module.exports = live_score.Stave;
