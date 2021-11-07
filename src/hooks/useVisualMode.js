import React, { useEffect, useState } from "react";


// Create a transition function within useVisualMode 
// that will take in a new mode and update the mode state with the new value

export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory]  = useState([initial]);
  console.log('HISTORY 1', history)

  function transition(mode, replace = false) {

    if (replace === true) {
      setMode(mode);
      setHistory(history => [...history.slice(0,-1), mode])
    } else {
      console.log('HERE')
      setMode(mode);
      setHistory(history => [...history, mode])
    }

  }
  
  function back() {

    if (history.length > 1) {
      setHistory([...history.slice(0,-1)])
      setMode(history[history.length-2])
    }
    
  }

  return { mode: history[history.length - 1], transition, back };

}

