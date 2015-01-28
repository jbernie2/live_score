live_score.Stave = function(stave_options){
  this.clef = stave_options.clef;
  this.measures = [];
  this.voices = [];
};

live_score.Stave.prototype.add_measures = function(num_measures,
  measure_options){
  for(var i = 0; i < num_measures; i++){
    this.measures.push(new live_score.Measure(measure_options));
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
    var new_voice = new live_score.Voice(this.measures);
    new_voice.add_note(note_info);
    this.voices.push(new_voice);
  }
};
