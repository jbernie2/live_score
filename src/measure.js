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
  
  var rests = this.fill_space_with_rests(0,this.num_ticks);
  for(var i = 0; i < rests.length; i++){
    this.notes.push(rests[i]);
  }
  /*
  var ticks_left = this.num_ticks;
  var ticks_so_far = 0;
  while(ticks_left > 0){
    var beat_level = this.calculate_beat_level(ticks_so_far);
    ticks_left = this.num_ticks - ticks_so_far;
    var rest_length = this.optimal_rest_length(beat_level, ticks_left);
    ticks_left = ticks_left - live_score.note_length_to_ticks(rest_length);
    this.notes.push(new live_score.Note(live_score.rest_pitch,rest_length,
      live_score.rest_type));
  }
  */
};

live_score.Measure.prototype.fill_space_with_rests = function(start_tick,
  end_tick){
  var rests = [];
  var ticks_so_far = start_tick;
  var ticks_left = end_tick - start_tick;
  while(ticks_left > 0){
    var beat_level = this.calculate_beat_level(ticks_so_far);
    var rest_length = this.optimal_rest_length(beat_level, ticks_left);
    ticks_left = ticks_left - live_score.note_length_to_ticks(rest_length);
    rests.push(new live_score.Note(live_score.rest_pitch,rest_length,
      live_score.rest_type));
  }
  return rests;
};

live_score.Measure.prototype.calculate_beat_level = function(total_ticks){
  var beat_level = this.num_ticks;
  for(var note_name in live_score.note_lengths){
    var note_length = live_score.note_lengths[note_name];
    var ticks = live_score.note_length_to_ticks(note_length);
    if(total_ticks % ticks === 0 &&
       note_length < beat_level  &&
       ticks <= this.num_ticks){
      beat_level = note_length; 
    }
  }
  return beat_level;
};

live_score.Measure.prototype.optimal_rest_length = function(beat_position,num_ticks){

  var min_tick_difference = this.num_ticks;
  var best_fit_note = null;
  for(var note_name in live_score.note_lengths){
    var note_length = live_score.note_lengths[note_name];
    var note_ticks = live_score.note_length_to_ticks(note_length);
    var tick_difference = num_ticks - note_ticks;
    if(note_length >= beat_position && 
      tick_difference < min_tick_difference &&
      tick_difference >= 0){
      
      min_tick_difference = tick_difference;
      best_fit_note = note_length;
    }
  }
  return best_fit_note;
};

live_score.Measure.prototype.add_note = function(note_info){
  note_info.quantized_tick_position = this.quantize_position(
    note_info.quantization,note_info.x_position);
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
  
  var note_position = note_info.quantized_tick_position;
  var current_position = 0;
  var note_added = false;
  for(var i = 0; i <= this.notes.length && !note_added; i++){
    if(current_position === note_position){
      //TODO: add add_note function to Note object
      this.notes[i].add_note(note_info);
      note_added = true;
    }else if(current_position > note_position){
      this.split_and_insert(current_position,i-1,note_info);
      note_added = true;
    }else{
      var note_length = this.notes[i].length;
      var tick_length = live_score.note_length_to_ticks(note_length);
      current_position += tick_length;
    }
  }
};

live_score.Measure.prototype.split_and_insert = function(current_position,
  note_to_split_index,note_info){
  
  var note_to_split = this.notes[note_to_split_index];
  
  //first split segment
  var first_start_position = current_position - live_score.note_length_to_ticks(
    note_to_split.length);
  var first_end_position = note_info.quantized_tick_position; 
  
  //second split segment
  var second_start_position = note_info.quantized_tick_position + 
    live_score.note_length_to_ticks(note_info.note_length);
  var second_end_position = current_position;

  if(note_to_split.is_rest()){
    
    this.notes.splice(note_to_split_index,1);
  
    var rests = this.fill_space_with_rests(second_start_position,
      second_end_position);
    for(var i = 0; i < rests.length; i++){
      this.notes.splice(note_to_split_index,0,rests[i]);
    }
    
    var new_note = new live_score.Note(note.pitch, note_info.note_length,
      live_score.note_type);     
    this.notes.splice(note_to_split_index,0,new_note);
   
    rests = this.fill_space_with_rests(first_start_position,
      first_end_position);
    for(i = 0; i < rests.length; i++){
      this.notes.splice(note_to_split_index,0,rests[i]);
    }
        
  }else{
    //TODO: fill in for what to do if note is being split
  }
};

module.exports = live_score.Measure;
