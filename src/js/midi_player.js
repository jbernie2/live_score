live_score = require("./live_score.js");
live_score.structs = require("./structs.js");

live_score.Midi_player = function(){
  //console.log(MIDI.apis);
};

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

live_score.Midi_player.prototype.calculate_timing_constant = function(tempo){
  
  var beats_per_second = 60/tempo;
  var time_per_4_4_measure = beats_per_second*4;
  var timing_constant = time_per_4_4_measure / live_score.RESOLUTION;
  return timing_constant; 
};

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

live_score.Midi_player.prototype.increment_time = function(notes,timing_constant){
  var ticks = live_score.note_length_to_ticks(notes[0].display_length);
  var duration = ticks * timing_constant;
  return duration;
};

module.exports = live_score.Midi_player;
