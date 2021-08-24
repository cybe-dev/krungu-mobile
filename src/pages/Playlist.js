import React from 'react';
import {FlatList, View, Text} from 'react-native';
import color from '../color';
import TrackList from '../components/TrackList';
import TrackPlayer from 'react-native-track-player';
import {useIsFocused} from '@react-navigation/native';
import {PlayerContext} from '../context/player';

export default function Playlist() {
  const [tracks, setTracks] = React.useState([]);
  const isFocus = useIsFocused();
  const {
    state: {index: currentIndex, playing},
  } = React.useContext(PlayerContext);

  React.useEffect(() => {
    if (isFocus) {
      (async () => {
        const getList = await TrackPlayer.getQueue();
        setTracks(getList);
      })();
    }
  }, [isFocus]);

  if (tracks.length < 1) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: color.whiteSemi,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{fontFamily: 'MerriweatherSans-Bold', color: color.blackSemi}}>
          Tidak ada track
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      style={{flex: 1, backgroundColor: color.whiteSemi}}
      contentContainerStyle={{paddingBottom: 112}}
      data={tracks}
      keyExtractor={(item, index) => `${index}`}
      renderItem={({item, index}) => (
        <TrackList
          onPress={() => {
            if (index === currentIndex) {
              if (playing) {
                TrackPlayer.pause();
              } else {
                TrackPlayer.play();
              }
            } else {
              TrackPlayer.skip(index);
              TrackPlayer.play();
            }
          }}
          title={`${item.artist} - ${item.title}`}
          active={index === currentIndex}
          paused={!playing}
        />
      )}
    />
  );
}
