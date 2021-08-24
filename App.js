import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar, Text} from 'react-native';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
  Capability,
} from 'react-native-track-player';
import BookmarkIcon from './src/assets/icons/Bookmark.svg';
import CompassIcon from './src/assets/icons/Compass.svg';
import PlaylistIcon from './src/assets/icons/Playlist.svg';
import color from './src/color';
import FloatingPlayer from './src/components/FloatingPlayer';
import {PlayerContext} from './src/context/player';
import {SavedContext} from './src/context/saved';
import Home from './src/pages/Home';
import PlayerScreen from './src/pages/PlayerScreen';
import Playlist from './src/pages/Playlist';
import PlaylistDetail from './src/pages/PlaylistDetail';
import Saved from './src/pages/Saved';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = ({navigation}) => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarStyle: {
            height: 56,
            elevation: 0,
          },
          tabBarLabelStyle: {
            fontFamily: 'Montserrat-Regular',
            marginTop: -6,
            marginBottom: 8,
          },
          tabBarActiveTintColor: color.primary,
          tabBarInactiveTintColor: color.gray,
          tabBarIcon: ({focused}) => {
            let Icon;

            if (route.name === 'Home') {
              Icon = CompassIcon;
            } else if (route.name === 'Playlist') {
              Icon = PlaylistIcon;
            } else if (route.name === 'Saved') {
              Icon = BookmarkIcon;
            }

            // You can return any component that you like here!
            return (
              <Icon
                width={20}
                height={24}
                fill={focused ? color.primary : color.gray}
              />
            );
          },
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Discover',
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Playlist"
          component={Playlist}
          options={{
            title: 'Playlist',
            headerStyle: {
              elevation: 0,
              backgroundColor: color.primary,
            },
            headerTintColor: color.white,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              fontSize: 18,
            },
            headerTitleAlign: 'center',
          }}
        />
        <Tab.Screen
          name="Saved"
          component={Saved}
          options={{
            title: 'Saved',
            headerStyle: {
              elevation: 0,
              backgroundColor: color.primary,
            },
            headerTintColor: color.white,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              fontSize: 18,
            },
            headerTitleAlign: 'center',
          }}
        />
      </Tab.Navigator>
      <FloatingPlayer onPress={() => navigation.navigate('PlayerScreen')} />
    </>
  );
};

const events = [
  Event.PlaybackState,
  Event.PlaybackTrackChanged,
  Event.RemoteNext,
  Event.RemotePrevious,
  Event.RemotePlay,
  Event.RemotePause,
];

export default function App() {
  const [playerState, setPlayerState] = React.useState(null);
  const {dispatch} = React.useContext(PlayerContext);
  const {dispatch: dispatchSaved} = React.useContext(SavedContext);

  useTrackPlayerEvents(events, event => {
    if (event.type === Event.PlaybackState) {
      setPlayerState(event.state);
    }
    if (event.type === Event.PlaybackTrackChanged) {
      if (event.nextTrack >= 0) {
        dispatch({type: 'set-index', index: event.nextTrack});
      }
    }
    if (event.type === Event.RemotePause) {
      TrackPlayer.pause();
    }
    if (event.type === Event.RemoteNext) {
      TrackPlayer.skipToNext();
    }
    if (event.type === Event.RemotePrevious) {
      TrackPlayer.skipToPrevious();
    }
    if (event.type === Event.RemotePlay) {
      TrackPlayer.play();
    }
  });

  const isPlaying = playerState === State.Playing;

  React.useEffect(() => {
    TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
    });
    (async () => {
      let saved = await AsyncStorage.getItem('@saved');
      if (saved) {
        dispatchSaved({type: 'reset', value: JSON.parse(saved)});
      }
    })();
    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  React.useEffect(() => {
    dispatch({type: 'set-playing', value: isPlaying});
  }, [isPlaying]);

  React.useEffect(() => {
    dispatch({type: 'set-player-state', value: playerState});
  }, [playerState]);
  return (
    <>
      <StatusBar backgroundColor={color.statusbar} barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PlaylistDetail"
            component={PlaylistDetail}
            options={{
              title: '',
              animation: 'slide_from_right',
              headerShadowVisible: false,
              headerTintColor: color.white,
              headerStyle: {
                backgroundColor: color.primary,
              },
            }}
          />
          <Stack.Screen
            name="PlayerScreen"
            component={PlayerScreen}
            options={{
              title: 'Now Playing',
              animation: 'slide_from_bottom',
              headerShadowVisible: false,
              headerBackVisible: false,
              headerTitleAlign: 'center',
              headerTitle: () => (
                <Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 18,
                    color: color.blackSemi,
                  }}>
                  Now Playing
                </Text>
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
