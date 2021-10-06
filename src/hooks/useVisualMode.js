import React, { useEffect, useState } from "react";


// Create a transition function within useVisualMode 
// that will take in a new mode and update the mode state with the new value

export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory]  = useState([initial]);

  // Transition adds the new mode to our history
  function transition(mode, replace = false) {
    if (replace === true) {
      setMode(mode);
      setHistory([...history.slice(0,-1), mode])
      console.log('HISTORY 3', history)
    } else {
      setMode(mode);
      setHistory([...history, mode])
    }
    
  }
  
  
  // back should set the mode to the previous item in our history array
  function back() {
    console.log('MODE 2:', mode)
    console.log('HISTORY', history)

    if (history.length > 1) {
      setHistory([...history.slice(0,-1)])
      console.log('HISTORY 2', history)
      setMode(history[history.length-2])
    }
    
  }

  console.log('MODE 1 : ', mode);
  
  return { mode, transition, back};

}

