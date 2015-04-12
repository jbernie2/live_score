live_score = require("./live_score.js");
live_score.structs = require("./structs.js");

/**
* Midi_player
*   renders the score contents as playable midi using MIDI.js
* args
*   none
* returns
*   none
*/
live_score.Midi_player = function(){
 
};

/**
* play
*   renders the score contents as playable midi using MIDI.js
* args
*   staves
*     array containing all the notes in the score
* returns
*   none
*/
live_score.Midi_player.prototype.play = function(staves){
  
  var tempo = 120;
  var note_list = this.create_note_list(tempo,staves);


  MIDI.loadPlugin({
    soundfontUrl: "./soundfont/",
    instrument: "acoustic_grand_piano",
 		onprogress: function(state, progress) {
			console.log(state, progress);
		}, 
    onsuccess: function() {
      for(var i = 0; i < note_list.length; i++){
        var note = note_list[i];
        MIDI.setVolume(note.channel,note.velocity);
        MIDI.noteOn(note.channel,note.note_number,note.velocity,
          note.note_on);
        MIDI.noteOff(note.channel,note.note_number,note.note_off);
      }
    }
  });
};

/**
* create_note_list
*   flattens the nested array of notes into a list
* args
*   tempo
*     the tempo to play the notes at
*   staves
*     array containing all the notes in the score
* returns
*   midi_notes
*     an array of all the midi formatted notes to be played
*/
live_score.Midi_player.prototype.create_note_list = function(tempo,staves){
  
  var midi_notes = [];
  var timing_constant = this.calculate_timing_constant(tempo);
  
  for(var i = 0; i < staves.length; i++){
    var time = 0.5;
    var measures = staves[i];
    for(var j = 0; j < measures.length; j++){
      var chords = measures[j];
      for(var k = 0; k < chords.length; k++){
        var notes = chords[k];
        if(notes[0].type == live_score.note_type){      
          for(var l = 0; l < notes.length; l++){
            var midi_note_info = this.populate_midi_note_info(notes[l],time,
              timing_constant);
            midi_notes.push(midi_note_info);
          }
        }
        time += this.increment_time(notes,timing_constant);
      }
    }
  }
  return midi_notes;
};


/**
* calculate_timing_constant
*   based on the tempo, and the max number of ticks in a 4/4 measure, creates
*   a constant that can be used to calculate the time length and delay of a
*   note based on its tick length and tick position
* args
*   tempo
*     the bpm of the notes being played
* returns
*   timing constant
*     a number used to convert ticks to milliseconds
*/
live_score.Midi_player.prototype.calculate_timing_constant = function(tempo){
  
  var beats_per_second = 60/tempo;
  var time_per_4_4_measure = beats_per_second*4;
  var timing_constant = time_per_4_4_measure / live_score.RESOLUTION;
  return timing_constant; 
};

/**
* populate_midi_note_info
*   based on the pitch and timing information, builds a midi_note_info object
*   (see structs.js)
* args
*   note
*     an object containing information about the note (see note.js)
*   time
*     the amount of time that has occurred before the note is to be played
*   timing_constant
*     a constant to convert ticks to milliseconds
* returns
*   midi_note_info
*     a struct (see structs.js) with information about how to play the midi
*     note
*/
live_score.Midi_player.prototype.populate_midi_note_info = function(note,time,
  timing_constant){

  var midi_note_info = live_score.structs.create_midi_note_info();
  midi_note_info.channel = 0;
  midi_note_info.velocity = 127;
  
  midi_note_info.note_number = live_score.translate_pitch_to_midi_number(
    note.pitch);
  midi_note_info.note_on = time;
  midi_note_info.note_off = time + (timing_constant * 
    live_score.note_length_to_ticks(note.length));

  return midi_note_info;
};

/**
* increment_time
*   increases the amount of time that has occurred so far in the score
* args
*   notes
*     an array of notes that has been played at this time slice
*   timing_constant
*     a constant to convert ticks to milliseconds
* returns
*   duration
*     the amount of time that has passed in the score, in milliseconds
*/
live_score.Midi_player.prototype.increment_time = function(notes,timing_constant){
  var ticks = live_score.note_length_to_ticks(notes[0].display_length);
  var duration = ticks * timing_constant;
  return duration;
};

module.exports = live_score.Midi_player;
