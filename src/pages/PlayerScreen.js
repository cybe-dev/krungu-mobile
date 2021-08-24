import React from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import color from '../color';
import DownIcon from '../assets/icons/Down.svg';
import PlayIcon from '../assets/icons/Play.svg';
import PauseIcon from '../assets/icons/Pause.svg';
import PrevIcon from '../assets/icons/Prev.svg';
import NextIcon from '../assets/icons/Next.svg';
import {PlayerContext} from '../context/player';
import TrackPlayer from 'react-native-track-player';

export default function PlayerScreen({navigation}) {
  const {
    state: {index, playing},
  } = React.useContext(PlayerContext);
  const [data, setData] = React.useState({});
  const [tracksCount, setTracksCount] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      const getTrack = await TrackPlayer.getTrack(index);
      setData(getTrack);
    })();
  }, [index]);

  React.useEffect(() => {
    (async () => {
      const count = await TrackPlayer.getQueue();
      setTracksCount(count.length);
    })();
  }, []);

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{
            padding: 12,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <DownIcon width={16} height={16} fill={color.primary} />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.whiteSemi,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 21,
      }}>
      <View
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: color.whiteBorder,
          borderRadius: 12,
          backgroundColor: color.white,
        }}>
        <Image
          source={{uri: data.artwork}}
          style={{width: 180, height: 180, borderRadius: 12}}
          resizeMode="cover"
        />
      </View>
      <Text
        style={{
          fontFamily: 'MerriweatherSans-Bold',
          fontSize: 18,
          color: color.blackSemi,
          marginTop: 20,
        }}
        numberOfLines={1}>
        {data.title}
      </Text>
      <Text style={{color: color.gray}} numberOfLines={1}>
        {data.artist}
      </Text>
      <View
        style={{
          marginTop: 40,
          width: 250,
          flexDirection: 'row',
          backgroundColor: color.white,
          height: 80,
          borderRadius: 80 / 2,
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
        }}>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            if (index !== 0) {
              TrackPlayer.skipToPrevious();
            }
          }}>
          <PrevIcon width={16} height={16} fill={color.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (playing) {
              TrackPlayer.pause();
            } else {
              TrackPlayer.play();
            }
          }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 60 / 2,
            backgroundColor: color.primary,
            borderWidth: 2,
            borderColor: color.whiteSemi,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {playing ? (
            <PauseIcon width={16} height={16} fill={color.white} />
          ) : (
            <PlayIcon width={16} height={16} fill={color.white} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            if (index + 1 < tracksCount) {
              TrackPlayer.skipToNext();
            }
          }}>
          <NextIcon width={16} height={16} fill={color.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
