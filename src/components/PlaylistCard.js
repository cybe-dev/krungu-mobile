import React from 'react';
import {Dimensions, Text, TouchableOpacity, View, Image} from 'react-native';
import color from '../color';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function PlaylistCard({onPress, loading, image, name}) {
  const width = (Dimensions.get('screen').width - 21 * 2) / 2 - 6;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        backgroundColor: color.white,
        padding: 16,
        width,
        margin: 6,
        borderRadius: 12,
      }}>
      {loading ? (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            width="100%"
            height={width - 16 * 2}
            borderRadius={12}
          />
          <SkeletonPlaceholder.Item
            width="100%"
            height={16}
            marginTop={16}
            borderRadius={5}
          />
        </SkeletonPlaceholder>
      ) : (
        <>
          <Image
            source={{uri: image}}
            style={{
              backgroundColor: '#AAA',
              width: '100%',
              height: width - 16 * 2,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
          <Text
            style={{
              fontFamily: 'MerriweatherSans-Bold',
              lineHeight: 22,
              color: color.blackSemi,
              marginTop: 16,
              textAlign: 'center',
            }}
            numberOfLines={2}>
            {name}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
