/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import App from './App';
import {name as appName} from './app.json';
import {PlayerProvider} from './src/context/player';
import {SavedProvider} from './src/context/saved';

const AppContainer = () => {
  return (
    <PlayerProvider>
      <SavedProvider>
        <App />
      </SavedProvider>
    </PlayerProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppContainer);
TrackPlayer.registerPlaybackService(() => require('./player-service'));
