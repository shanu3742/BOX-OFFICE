import { useReducer, useEffect, useState } from 'react';

function showReducer(prevState, action) {
  if (action.type === 'ADD') {
    return [...prevState, action.showid];
  }
  if (action.type === 'REMOVE') {
    return prevState.filter(showid => showid !== action.showid);
  }
  return prevState;
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : initial;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);
  return [state, dispatch];
}
export function useShow(key = 'show') {
  return usePersistedReducer(showReducer, [], key);
}
export function useLastQueery(key = 'lastQuery') {
  const [input, setInput] = useState(() => {
    const persisted = sessionStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : '';
  });
  const setPersistedInput = newState => {
    setInput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  };
  return [input, setPersistedInput];
}
