live_score = require("./live_score.js");

live_score.Renderer = function(score_panel){
  this.score_panel = score_panel;
  this.vexflow_renderer = new Vex.Flow.Renderer(score_panel,
    Vex.Flow.Renderer.Backends.CANVAS);
  this.score_panel_context = this.vexflow_renderer.getContext();
};

live_score.Renderer.prototype.render_score = function(staves){

  for(var i = 0; i < staves.length; i++){
    
    var vexflow_stave = new Vex.Flow.Stave(10,0,2000);
    vexflow_stave.addClef(staves[i].clef);

    var vexflow_voice = this.render_voices(staves[i].get_total_num_beats(),
      staves[i].voices);

    vexflow_voice.draw(this.score_panel_context,vexflow_stave);
  }
};

live_score.Renderer.prototype.render_voices = function(total_num_beats,voices){

  var vexflow_voices = [];
  for(var i = 0; i < voices.length; i++){
    var vexflow_voice = this.create_vexflow_voice(total_num_beats);
    var vexflow_notes = this.render_measures(voices[i].measures);
    vexflow_voice.addTickables(vexflow_notes);
    vexflow_voices.push(vexflow_voice);
  }

  var formatter = new Vex.Flow.Formatter().joinVoices(vexflow_voices).
    format(vexflow_voices, 500);

  return vexflow_voices[0];
};

live_score.Renderer.prototype.render_measures = function(measures){
  var vexflow_notes = [];
  for(var i = 0; i < measures.length; i++){
    vexflow_notes = vexflow_notes.concat(this.render_notes(measures[i].notes));
  }
  return vexflow_notes;
};

live_score.Renderer.prototype.render_notes = function(notes){
  var vexflow_notes = [];
  for(var i = 0; i < notes.length; i++){
    vexflow_notes.push(this.create_vexflow_note(notes[i])); 
  }
  return vexflow_notes;
};

live_score.Renderer.prototype.create_vexflow_voice = function(total_num_beats){
  return new Vex.Flow.Voice({
    num_beats: total_num_beats,
    beat_value: 4,
    resolution: Vex.Flow.RESOLUTION
  });
};

live_score.Renderer.prototype.create_vexflow_note = function(note){
  var length = note.length.toString();
  var pitch = note.pitch;
  
  if(note.type === live_score.rest_type){
    length += live_score.rest_type;
  }

  return new Vex.Flow.StaveNote({keys: pitch, duration: length});
};

module.exports = live_score.Renderer;
