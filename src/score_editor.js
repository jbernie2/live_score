live_score                 = require("./live_score.js");
live_score.Ui              = require("./ui.js");
live_score.Graphical_state = require("./graphical_state.js");
live_score.Musical_state   = require("./musical_state.js");
live_score.Renderer        = require("./renderer.js");

live_score.Score_editor = function(score_editor_div){
  this.ui = new live_score.Ui(this,score_editor_div);
  this.gs = new live_score.Graphical_state();
  this.ms = new live_score.Musical_state();
  this.renderer = new live_score.Renderer();
};

live_score.Score_editor.prototype.add_note = function(event_info){
  var note_info = this.gs.get_score_position(event_info);
  var staves = this.ms.add_note(note_info);
  var score = this.renderer.render_score(staves);
  this.gs.update(score);
};

module.exports = live_score.Score_editor;
