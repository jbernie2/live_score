live_score = require("./live_score.js");
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

module.exports = live_score.Graphical_object;
