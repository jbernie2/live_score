live_score = require("./live_score.js");

live_score.Ui = function(event_controller, score_editor_div_id){
  this.event_controller = event_controller;
  this.score_editor_div_id = score_editor_div_id;
  this.score_editor_div = document.getElementById(score_editor_div_id);
  this.initialize_ui_panels();
};

live_score.Ui.prototype.initialize_ui_panels = function(){
  this.initialize_score_panel();
};

live_score.Ui.prototype.initialize_score_panel = function(){
  this.score_panel = document.createElement('canvas');
  this.score_panel.id = 'score_panel';
  this.score_panel.width = 1000;
  this.score_panel.height = 500;

  this.score_editor_div.appendChild(this.score_panel);
};

module.exports = live_score.Ui;
