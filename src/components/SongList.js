import React from 'react';
import {Image, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import color from '../color';

export default function SongList({loading, title, artist, artwork}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 16,
        marginBottom: 12,
        backgroundColor: color.white,
        borderRadius: 4,
        alignItems: 'center',
      }}>
      {loading ? (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item width={54} height={54} borderRadius={4} />
        </SkeletonPlaceholder>
      ) : (
        <Image
          source={{uri: artwork}}
          style={{width: 54, height: 54, borderRadius: 4}}
          resizeMode="cover"
        />
      )}
      <View style={{flex: 1, marginLeft: 16}}>
        {loading ? (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item height={16} width="100%" />
            <SkeletonPlaceholder.Item height={14} width="50%" marginTop={8} />
          </SkeletonPlaceholder>
        ) : (
          <>
            <Text
              style={{
                fontFamily: 'MerriweatherSans-Bold',
                fontSize: 16,
                color: color.blackSemi,
                lineHeight: 24,
              }}
              numberOfLines={1}>
              {title}
            </Text>
            <Text style={{lineHeight: 22, color: color.gray}} numberOfLines={1}>
              {artist}
            </Text>
          </>
        )}
      </View>
    </View>
  );
}
