live_score                 = require("./live_score.js");
live_score.Ui              = require("./ui.js");
live_score.Graphical_state = require("./graphical_state.js");
live_score.Musical_state   = require("./musical_state.js");
live_score.Renderer        = require("./renderer.js");

live_score.Score_editor = function(score_editor_div_id){
  this.ui = new live_score.Ui(this,score_editor_div_id);
  this.gs = new live_score.Graphical_state();
  this.ms = new live_score.Musical_state();
  this.renderer = new live_score.Renderer(this.ui.score_panel);

  //TEST CODE
  this.add_staves(null);
  this.add_measures(null);
  this.TEST_RENDER(null);
};

live_score.Score_editor.prototype.add_staves = function(event_info){
  var stave_options = [{clef:"treble"}];
  this.ms.add_staves(stave_options);
};

live_score.Score_editor.prototype.add_measures = function(event_info){
  var num_measures = 4;
  var measure_options = {num_beats:4, beat_value:4};
  this.ms.add_measures(num_measures,measure_options);
};

live_score.Score_editor.prototype.add_note = function(event_info){
  var note_info = this.gs.get_score_position(event_info);
  var staves = this.ms.add_note(note_info);
  var score = this.renderer.render_score(staves);
  this.gs.update(score);
};

live_score.Score_editor.prototype.TEST_RENDER = function(event_info){
  this.renderer.render_score(this.ms.staves);
};

module.exports = live_score.Score_editor;
