live_score       = require("./live_score.js");
live_score.Voice = require("./voice.js");

/**
* Stave
*   Constructor
* args
*   stave_options
*     configuration options for creating a stave, currently just the clef type
* returns
*   none
*/
live_score.Stave = function(stave_options){
 
  /**
  * the type of clef that will be used by the stave
  */
  this.clef = stave_options.clef;

  /**
  * an array of the voices contained in the stave
  */
  this.voices = [];

  /**
  * a special voice used to render barlines between measures MAY BE REMOVED
  */
  this.barline_voice = undefined;

  /**
  * a list of all the measure_options ordered chronologically,
  * this is maintained at the stave level, so that all voices reference the
  * same time signature information
  */
  this.measure_meta_data = [];
};

/**
* add_measures
*   adds measures to a stave, adds measures to every voice in the stave
* args
*   num_measures
*     the number of measures to add
*   measure_options
*     time signature information about the measures being added
* returns
*   none
*/
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
  
  if(!this.barline_voice){
    this.barline_voice = new live_score.Voice(this.measure_meta_data);
  }else{
    this.barline_voice.add_measures(num_measures,measure_options);
  }
};

/**
* add_measures
*   adds_measures to the score
* args
*   event_info
*     information about the ui event, will be interpreted by Graphical_state
* returns
*   none
*/
live_score.Stave.prototype.add_note = function(note_info){
  note_info.pitch = this.get_pitch_from_note_position(note_info.y_position);
  var note_added = false;
  var current_voice = 0;
  for(var i = 0; i < this.voices.length && !note_added; i++){
    note_added = this.voices[current_voice].add_note(note_info);
  }
  if(!note_added){
    var new_voice = new live_score.Voice(this.measure_meta_data);
    new_voice.add_note(note_info);
    this.voices.push(new_voice);
  }
};

/**
* add_measure_meta_data
*   adds time signature information about new measures to the measure meta data
* args
*   num_measures
*     number of measures being added
*   measure_options
*     time signature information for the measures being added 
* returns
*   none
*/
live_score.Stave.prototype.add_measure_meta_data = function(num_measures,
  measure_options){
  for(var i = 0; i < num_measures; i++){
    this.measure_meta_data.push(measure_options);
  }
};

/**
* get_total_num_beats
*   calculates the total number of beats (in terms of whole quarter note beats, 
*   rounded up) for the entire stave
* args
*   none
* returns
*   total_num_beats
*     the total number of quarter note beats in the stave
*/
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

live_score.Stave.prototype.get_pitch_from_note_position = function(y_position){
  var highest_pitch = live_score.highest_clef_pitch[this.clef];
  highest_pitch = live_score.translate_pitch_to_midi_number(highest_pitch);
  var new_pitch = highest_pitch - y_position;
  return new_pitch;
};

module.exports = live_score.Stave;
