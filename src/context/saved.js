import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SavedContext = React.createContext();

const reducer = (state, action) => {
  const current = state;
  switch (action.type) {
    case 'reset':
      AsyncStorage.setItem('@saved', JSON.stringify(action.value));
      return [...action.value];
    case 'add':
      current.unshift(action.value);
      AsyncStorage.setItem('@saved', JSON.stringify(current));
      return [...current];
    case 'delete':
      current.splice(action.value, 1);
      AsyncStorage.setItem('@saved', JSON.stringify(current));
      return [...current];
  }
};

export const SavedProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(reducer, []);
  return (
    <SavedContext.Provider value={{state, dispatch}}>
      {children}
    </SavedContext.Provider>
  );
};
