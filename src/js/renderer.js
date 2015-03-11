Vex = require("vexflow");
live_score = require("./live_score.js");

/**
* live_score.Renderer
*   converts the information in live_score.Musical_state into Vexflow objects
*   allowing the information to be displayed as a score
*/


/**
* Renderer
*   Constructor for the Renderer Object
* args
*   score_panel
*     the html canvas element on which the rendered score is displayed
* returns
*   none
*/
live_score.Renderer = function(score_panel){

  /**
  * the html canvas element on which the score is rendered
  */
  this.score_panel = score_panel;

  /**
  * vexflow renderer, used to get the vexflow canvas context
  */
  this.vexflow_renderer = new Vex.Flow.Renderer(score_panel,
    Vex.Flow.Renderer.Backends.CANVAS);

  /**
  * vexflow renderer context, needed to render the score
  */
  this.score_panel_context = this.vexflow_renderer.getContext();

  /**
  * a list of the Vexflow staves created by the renderer
  */
  this.vexflow_staves = [];

  /**
  * a list of lists. each index is a list of Vexflow voices belonging to the
  * corresponding Vexflow stave.
  */
  this.vexflow_voices_list = [];
};

/**
* clear_score
*   clears the contents of the canvas so it can be redrawn
* args
*   none
* returns
*   none
*/
live_score.Renderer.prototype.clear_score = function(){
  this.score_panel_context.clearRect(0,0,this.score_panel.width,
    this.score_panel.height);
};

/**
* display_score
*   takes the rendered vexflow staves and draws them on the canvas
* args
*   none
* returns
*   none
*/
live_score.Renderer.prototype.display_score = function(){
  
  this.clear_score();

  for(var i = 0; i < this.vexflow_staves.length; i++){
    var vexflow_stave = this.vexflow_staves[i];
    var vexflow_voices = this.vexflow_voices_list[i];
    
    vexflow_stave.draw();

    var formatter = new Vex.Flow.Formatter().joinVoices(vexflow_voices).
    format(vexflow_voices, 500);

    for(var j = 0; j < vexflow_voices.length; j++){
      vexflow_voices[j].draw(this.score_panel_context,vexflow_stave);
    }
  }
};

/**
* render_score
*   creates/renders the staves and voices of the score
* args
*   staves
*     an array of live_score.Stave passed in from the Musical_state object
* returns
*   none
*/
live_score.Renderer.prototype.render_score = function(staves){

  this.vexflow_staves = [];
  this.vexflow_voices_list = [];

  for(var i = 0; i < staves.length; i++){
 
    var vexflow_stave = new Vex.Flow.Stave(10,0,1000);
    vexflow_stave.addClef(staves[i].clef);

    var vexflow_voices = this.render_voices(staves[i].get_total_num_beats(),
      staves[i].voices);

    vexflow_stave.setContext(this.score_panel_context);

    this.vexflow_staves.push(vexflow_stave);
    this.vexflow_voices_list.push(vexflow_voices);
  }
};

/**
* render_voices
*   converts live_score voices into vexflow voices
* args
*   total_num_beats
*     the total number of beats in the entire score for one voice, used to
*     create the vexflow voice
*   voices
*     an array of the live_score voices
* returns
*   vexflow_voices
*     an array of formatted and aligned vexflow voices
*/
live_score.Renderer.prototype.render_voices = function(total_num_beats,voices){

  var vexflow_voices = [];
  for(var i = 0; i < voices.length; i++){
    var vexflow_voice = this.create_vexflow_voice(total_num_beats);
    var vexflow_notes = this.render_measures(voices[i].measures);
    vexflow_voice.addTickables(vexflow_notes);
    vexflow_voices.push(vexflow_voice);
  }
  return vexflow_voices;
};

/**
* render_measures
*   concats all notes for every measure into one array vexflow notes
* args
*   measures
*     an array of live_score measures
* returns
*   vexflow_notes
*     an array of all notes played in the score separated into measures by 
*     barlines
*/
live_score.Renderer.prototype.render_measures = function(measures){
  var vexflow_notes = [];
  for(var i = 0; i < measures.length; i++){
    vexflow_notes = vexflow_notes.concat(this.render_notes(measures[i].notes));
    vexflow_notes.push(new Vex.Flow.BarNote());
  }
  return vexflow_notes;
};

/**
* render_notes
*   converts each measure's notes into arrays of vexflow notes
* args
*   notes
*     an array of live_score notes
* returns
*   vexflow_notes
*     an array of all the notes played in a measure
*/
live_score.Renderer.prototype.render_notes = function(notes){
  var vexflow_notes = [];
  for(var i = 0; i < notes.length; i++){
    vexflow_notes.push(this.create_vexflow_note(notes[i])); 
  }
  return vexflow_notes;
};

/**
* create_vex_flow_voice
*   does the actual conversion between a live_score voice and a vexflow voice
* args
*   total_num_beats
*     the total number of beats in the entire score
* returns
*   new Vex.Flow.Voice
*     vexflow voice with properties parallel to the live_score voice
*/
live_score.Renderer.prototype.create_vexflow_voice = function(total_num_beats){
  return new Vex.Flow.Voice({
    num_beats: total_num_beats,
    beat_value: 4,
    resolution: Vex.Flow.RESOLUTION
  });
};

/**
* create_vex_flow_note
*   does the actual conversion between a live_score note and a vexflow note
* args
*   note
*     live_score note
* returns
*   vexflow_note
*     vexflow note with properties parallel to the live_score note, with some
*     exceptions for notes that overlap notes.
*/
live_score.Renderer.prototype.create_vexflow_note = function(note){
  var length = note.length.toString();
  if(note.type === live_score.rest_type){
    length += live_score.rest_type;
  }
  
  var pitches = [];
  for(var i = 0; i < note.pitches.length; i++){
    pitches.push(note.pitches[i].pitch);
  }

  var vexflow_note = new Vex.Flow.StaveNote({keys:pitches,duration:length});
  return vexflow_note;
};

/**
* get_staves
*   returns an array of vexflow staves
* args
*   none
* returns
*   this.vexflow_staves
*/
live_score.Renderer.prototype.get_staves = function(){
  return this.vexflow_staves;
};

/**
* get_voices
*   returns an array of arrays of Vexflow voices
* args
*   none
* returns
*   return this.vexflow_voices_list;
*/
live_score.Renderer.prototype.get_voices = function(){
  return this.vexflow_voices_list;
};

module.exports = live_score.Renderer;
