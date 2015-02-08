live_score = require("./live_score.js");
live_score.Graphical_object = require("./graphical_object.js");

/**
* Score_panel
*   Constructor for the Score_panel Ui object
* args
*   none
* returns
*   none
*/
live_score.Score_panel = function(event_controller){
  this.event_controller = event_controller;
  this.create_score_canvas();
  this.score_canvas_event_listeners();
};

/**
* create_score_canvas
*   creates the score panel, the ui element in which the score is drawn
* args
*   none
* returns
*   none
*/
live_score.Score_panel.prototype.create_score_canvas = function(){  
  this.score_canvas = document.createElement('canvas');
  this.score_canvas.id = 'score_panel';
  this.score_canvas.width = 1000;
  this.score_canvas.height = 500;
};

live_score.Score_panel.prototype.attach_score_panel = function(parent_element){
  parent_element.appendChild(this.score_canvas);
};

live_score.Score_panel.prototype.score_canvas_event_listeners = function(){
  this.score_canvas.addEventListener('mousedown',this.get_click_position(),
    false);  
};

live_score.Score_panel.prototype.get_click_position = function(){
    
    var score_canvas = this.score_canvas;
    var event_controller = this.event_controller;

    return function(e){
      var event_info = {};

      event_info.graphical_object = new live_score.Graphical_object();
      event_info.graphical_object.start_x = e.clientX - score_canvas.offsetLeft;
      event_info.graphical_object.end_x = e.clientX - score_canvas.offsetLeft;
      event_info.graphical_object.start_y = e.clientY - score_canvas.offsetTop;
      event_info.graphical_object.end_y = e.clientY - score_canvas.offsetTop;
      
      //TODO: create an object that describes the current state of the UI,
      //This would be which options are currently being used, including the
      //note length that is being selected and whatever else
      //event_info.ui_state = ui_state;
      event_info.note_length = live_score.quarter;
      event_controller.add_note(event_info);
   };
};



