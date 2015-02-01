live_score = require("./live_score.js");

live_score.Ui = function(event_controller, score_editor_div){
  this.event_controller = event_controller;
  this.score_editor_div = score_editor_div;
  this.initialize_ui_panels();
};

live_score.Ui.prototype.initialize_ui_panels = function(){
  this.initialize_score_panel();
};

live_score.Ui.prototype.initialize_score_panel = function(){
  this.score_panel = document.createElement('canvas');
  this.score_panel.id = 'score_panel';
};

module.exports = live_score.Ui;
