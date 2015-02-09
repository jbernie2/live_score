Vex = require("vexflow");

/**
* The high-level namespace for this application
*/
live_score = {};

live_score.Score_editor = require("./score_editor.js");
module.exports = live_score;

/**
live_score
ui
  score_panel
  button_panel
  play_panel

control_logic
  add_note
  remove_note
  remove_notes
  add_measures
  remove_measures

score_graphical_state
  get_note
  get_notes

score_musical_state
  add_note
  remove_note
  add_measure
  remove_measure

  staves
  voices
  measures
  notes
  
score_renderer (Vex.Flow Interpreter)
  Vex.Flow.Stave
  voices
  measures
  notes


control flow
1. user action caught by ui
2. ui maps action to a control_logic function
3. control_logic finds what what selected in the score by querying the 
   graphical state.
4. control logic then sends this information to the musical state
5. musical state performs action to add/remove notes/measures
6. the control logic then calls the renderer to display the altered score
7. the graphical state is updated with the new positioning
*/
