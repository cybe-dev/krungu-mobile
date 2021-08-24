import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import color from '../color';
import PlayIcon from '../assets/icons/Play.svg';
import PauseIcon from '../assets/icons/Pause.svg';
import {PlayerContext} from '../context/player';
import TrackPlayer from 'react-native-track-player';

export default function FloatingPlayer({onPress}) {
  const {
    state: {index, playerState, playing},
  } = React.useContext(PlayerContext);
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    if (playerState) {
      (async () => {
        const getTrack = await TrackPlayer.getTrack(index);
        setData(getTrack);
      })();
    }
  }, [index, playerState]);

  if (!playerState || !data?.title) {
    return null;
  }
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{
        position: 'absolute',
        bottom: 56,
        right: 0,
        left: 0,
        padding: 16,
        backgroundColor: color.whiteSemi,
      }}>
      <View
        style={{
          backgroundColor: color.white,
          height: 80,
          borderRadius: 6,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        }}>
        <Image
          source={{uri: data?.artwork}}
          resizeMode="cover"
          style={{
            width: 60,
            height: 60,
            borderRadius: 6,
          }}
        />
        <View style={{flex: 1, marginHorizontal: 12, height: 60}}>
          <Text
            style={{fontFamily: 'Montserrat-Bold', color: color.blackSemi}}
            numberOfLines={1}>
            {data?.title}
          </Text>
          <Text
            style={{fontFamily: 'MerriweatherSans-Regular', color: color.gray}}
            numberOfLines={1}>
            {data?.artist}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (playing) {
              TrackPlayer.pause();
            } else {
              TrackPlayer.play();
            }
          }}
          style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: color.white,
            borderWidth: 1,
            borderColor: color.primary,
            borderRadius: 40 / 2,
          }}>
          {playing ? (
            <PauseIcon width={12} height={12} fill={color.primary} />
          ) : (
            <PlayIcon width={12} height={12} fill={color.primary} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
