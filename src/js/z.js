/* 
 * due to some bug, the live score object gets over written by the last 
 * alphabetical file. So this file just exports live_score and is the last 
 * file to be compiled, and therefore re-overwrites the live_score object
 * with the correct one.
 * THIS HACK IS VERY STUPID AND SHOULD BE FIXED
*/

live_score = require('./live_score.js');

module.exports = live_score;
