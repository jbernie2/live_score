live_score = require("./live_score.js");

/**
* Graphical_state
*   Constructor for the Graphical_state object, which contains all the
*   positional information about the musical information in the score.
*   It is responsible for figuring out which elements are being acted on 
*   by the user through translating Ui events into a format which can be
*   understood by the Musical_state object
* args
*   none
* returns
*   none
*/
live_score.Graphical_state = function(){

  /**
  * x,y information about the position of staves on the canvas, utilizes the
  * Graphical_object object
  */
  this.staves = [];

  /**
  * x positioning information about the start and end of measures on the canvas
  * utilizes the Graphical_object object
  */
  this.measures = [];

  /**
  * x,y positioning information about notes on the canvas, utilized the 
  * Graphical_object object.
  */
  this.notes = [];
};

/**
* Graphical_object
*   Constructor for the Graphical_object object. This object is used to denote
*   the coordinates on the canvas that contain a particular object on the score.
* args
*   start_x
*     the farthest left x position on the canvas of a given graphic
*   end_x
*     the farthest right x position on the canvas of a given graphic
*   start_y
*     the topmost y position on the canvas of a given graphic
*   end_y
*     the bottom-most y position on the canvas of a given graphic
* returns
*   none
*/
live_score.Graphical_object = function(start_x,end_x,start_y,end_y){
  this.start_x = start_x;
  this.end_x = end_x;
  this.start_y = start_y;
  this.end_y = end_y;
};

/**
* contains_coordinates
*   determines if a given x,y pair of coordinates are within the bounds of a
*   graphical object
* args
*   x
*     the x position of the point being checked
*   y
*     the y position of the point being checked
* returns
*   TBD
*/
live_score.Graphical_object.prototype.contains_coordinates = function(x,y){

};

module.exports = live_score.Graphical_state;
