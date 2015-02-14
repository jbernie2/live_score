live_score      = require("./live_score.js");
live_score.Note = require("./note.js");

/**
* Measure
*   The constructor for the Measure object.
* args
*   measure_meta_data
*     the measure_meta_data only for this measure
* returns
*   none
*/
live_score.Measure = function(measure_meta_data){

  /**
  * the number of beats in the measure, can be thought of as the numerator of
  * the measure's time signature.
  */
  this.num_beats = measure_meta_data.num_beats;

  /**
  * the length value of the beats in num_beats, can be thought of as the 
  * denominator of the measure's time signature
  */
  this.beat_value = measure_meta_data.beat_value;

  /**
  * an array of live_score.Note objects, representing the notes that are played
  * in this measure
  */
  this.notes = [];

  this.num_ticks = this.num_beats * live_score.note_length_to_ticks(
    this.beat_value);

  this.create_empty_measure();
};

/**
* create_empty_measure
*   Creates a measure whose length is based on measure_meta_data information,
*   and the measure is filled with rests
* args
*   none
* returns
*   none
*/
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

/**
* optimal_rest_length
*   Fills a space of a given length with the largest rests possible without the
*   rests holding over into the next measure
* args
*   remaining_beats
*     the length of space that needs to be filled with rests
* returns
*   best_fit_note
*     the length of the rest that best fits the given space
*/
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

live_score.Measure.prototype.add_note = function(note_info){
  note_info.quantized_beat = this.quantize_position(note_info.quantization,
    note_info.x_position);
  this.place_note_in_measure(note_info);
  return true;
};

live_score.Measure.prototype.quantize_position = function(quantization,position){
  
  var quantized_beat_ticks = live_score.note_length_to_ticks(quantization);
  var num_quantized_beats = this.num_ticks/quantized_beat_ticks;
  var position_in_ticks = position*this.num_ticks;
  var quantized_tick_position;
  var min_tick_difference;

  if(num_quantized_beats * quantized_beat_ticks < this.num_ticks){
    quantized_tick_position = num_quantized_beats * quantized_beat_ticks;
    min_tick_difference = Math.abs(this.num_ticks - position_in_ticks);
  }else{
    quantized_tick_position = 0;
    min_tick_difference = this.num_ticks;
  }
  for(var i = 0; i < num_quantized_beats; i++){
    var ticks_before_beat = i * quantized_beat_ticks;
    var tick_difference = Math.abs(ticks_before_beat - position_in_ticks);
    if(tick_difference < min_tick_difference){
      min_tick_difference = tick_difference;
      quantized_ticks_position = ticks_before_beat;
    }
  }
  return quantized_ticks_position;
};

live_score.Measure.prototype.place_note_in_measure = function(note_info){
  

};

module.exports = live_score.Measure;
