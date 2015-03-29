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
* intersects_area
*   determines if another graphical_object intersects with this 
*   graphical_object
* args
*   graphical_object
*     the area being checked against the area of this graphical_object
* returns
*   intersects
*     either true or false, whehter the two areas overlap
*/
live_score.Graphical_object.prototype.intersects_area = function(
  graphical_object){
  
  var intersects = false;
  intersects = intersects || this.contains_point(graphical_object.start_x,
                                                 graphical_object.start_y);
  intersects = intersects || this.contains_point(graphical_object.end_x,
                                                 graphical_object.start_y);
  intersects = intersects || this.contains_point(graphical_object.start_x,
                                                 graphical_object.end_y);
  intersects = intersects || this.contains_point(graphical_object.end_x,
                                                 graphical_object.end_y);
  return intersects;
};

/**
* contains point
*   determines if this graphical_object contains a given x,y coordinate
* args
*   x
*     the point's x coordinate
*   y
*     the point's y coordinate
* returns
*   contains
*     either true or false, whehter this graphical_object contains the point
*/
live_score.Graphical_object.prototype.contains_point = function(x,y){
  var contains = true;
  contains = contains && (this.start_x < x);
  contains = contains && (this.end_x > x);
  contains = contains && (this.start_y < y);
  contains = contains && (this.end_y > y);
  return contains;
};

live_score.Graphical_object.prototype.before_area = function(graphical_object){
  return this.before_point(graphical_object.start_x);
};

live_score.Graphical_object.prototype.before_point = function(x){
  var contains = true;
  contains = contains && (this.start_x < x);
  return contains;
};

module.exports = live_score.Graphical_object;
