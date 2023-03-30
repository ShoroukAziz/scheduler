import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

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
