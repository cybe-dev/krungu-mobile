import React from 'react';

export const PlayerContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-index':
      return {...state, index: action.index};
    case 'set-playing':
      return {...state, playing: action.value};
    case 'set-player-state':
      return {...state, playerState: action.value};
  }
};

export const PlayerProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(reducer, {
    index: 0,
    playing: false,
    playerState: null,
  });
  return (
    <PlayerContext.Provider value={{state, dispatch}}>
      {children}
    </PlayerContext.Provider>
  );
};
