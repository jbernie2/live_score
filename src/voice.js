live_score         = require("./live_score.js");
live_score.Measure = require("./measure.js");
/**
* Voice
*   Constructor for the live_score.Voice object
* args
*   measure_meta_data
*     an array (whose length is the number of measures) with time signature
*     information about each measure
* returns
*   none
*/

live_score.Voice = function(measure_meta_data){

  /**
  * (see function description)
  */
  this.measure_meta_data = measure_meta_data;

  /**
  * an array of arrays, each element is an array of the notes played in that
  * given measure
  */
  this.measures = [];

  this.create_empty_voice();
};

/**
* create_empty_voice
*   creates a voice filled with rests whose length is equal to that indicated
*   by the measure_meta_data
* args
*   none
* returns
*   none
*/
live_score.Voice.prototype.create_empty_voice = function(){
  for(var i = 0; i < this.measure_meta_data.length; i++){
    this.measures.push(new live_score.Measure(this.measure_meta_data[i]));
  }
};

module.exports = live_score.Voice;
