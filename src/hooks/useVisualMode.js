import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  /**
   * Transitions forward to a new mode of the appointment component
   *
   * @param {string}  newMode  the mode that we want to transition to
   * @param {boolean} replace  a boolean used to skip going back to some modes like confirmation mode
   */
  function transition(newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      setHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        newHistory.pop();
        return newHistory;
      });
    }

    setHistory((prevHistory) => [...prevHistory, newMode]);
  }

  /**
   * Transitions backwards to the previous appointment mode
   * */
  function back() {
    if (history.length === 1) {
      return;
    }
    setMode(history[history.length - 2]);

    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory.pop();
      return newHistory;
    });
  }

  return { mode, transition, back };
}
