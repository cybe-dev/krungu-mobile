import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import color from '../color';
import PlayIcon from '../assets/icons/Play.svg';
import PauseIcon from '../assets/icons/Pause.svg';

export default function TrackList({title, active, paused, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 21,
        paddingVertical: 16,
        backgroundColor: color.white,
        borderBottomWidth: 1,
        borderColor: color.whiteBorder,
        flexDirection: 'row',
      }}>
      <Text
        style={{
          flex: 1,
          fontFamily: 'MerriweatherSans-Regular',
          color: color.blackSemi,
          marginRight: 12,
        }}
        numberOfLines={1}>
        {title}
      </Text>
      {active ? (
        paused ? (
          <PlayIcon width={18} height={18} fill={color.gray} />
        ) : (
          <PauseIcon width={18} height={18} fill={color.gray} />
        )
      ) : null}
    </TouchableOpacity>
  );
}
