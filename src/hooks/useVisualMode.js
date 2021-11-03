import React, { useEffect, useState } from "react";


// Create a transition function within useVisualMode 
// that will take in a new mode and update the mode state with the new value

export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory]  = useState([initial]);
  console.log('HISTORY 1', history)
  // Transition adds the new mode to our history
  // function transition(mode, replace) {
  //   setHistory(prev =>
  //     replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]
  //   );
  // }
  function transition(mode, replace = false) {
    // console.log('MODE, HISTORY ',mode, history)
    if (replace === true) {
      setMode(mode);
      // console.log('HISTORY: ', history.slice(0,-1))
      setHistory(history => [...history.slice(0,-1), mode])
      // console.log('HISTORY 3', history)
    } else {
      console.log('HERE')
      setMode(mode);
      setHistory(history => [...history, mode])
    }
    // console.log('HISTORY: ', history)
  }
  
  // function back() {
  //   setHistory(prev => {
  //     if (prev.length < 2) return prev;
  //     return prev.slice(0, prev.length - 1)
  //   });
  // }
  // back should set the mode to the previous item in our history array
  function back() {
    // console.log('MODE 2:', mode)
    // console.log('HISTORY', history)

    if (history.length > 1) {
      setHistory([...history.slice(0,-1)])
      // console.log('HISTORY 2', history)
      setMode(history[history.length-2])
    }
    
  }

  // console.log('MODE 1 : ', mode);
  
  // return { mode, transition, back};
  return { mode: history[history.length - 1], transition, back };

}

