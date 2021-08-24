import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import color from '../color';
import SongList from '../components/SongList';
import PlayIcon from '../assets/icons/Play.svg';
import BookmarkIcon from '../assets/icons/Bookmark.svg';
import service from '../service';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import TrackPlayer from 'react-native-track-player';
import {SavedContext} from '../context/saved';

export default function PlaylistDetail({route, navigation}) {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({});
  const {state: saved, dispatch} = React.useContext(SavedContext);
  const [hasSaved, setHasSaved] = React.useState(false);
  const [indexSaved, setIndexSaved] = React.useState(-1);

  const setPlayer = async () => {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.add(data.list);
    TrackPlayer.play();
    navigation.navigate('PlayerScreen');
  };

  React.useEffect(() => {
    setLoading(true);
    service
      .get(route.params.url)
      .then(response => {
        setLoading(false);
        setData(response.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    const findIndex = saved.findIndex(el => el.url === route.params.url);
    setIndexSaved(findIndex);
    if (findIndex >= 0) {
      setHasSaved(true);
    } else {
      setHasSaved(false);
    }
  }, [saved]);

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data.list || [{}, {}, {}]}
        style={{flex: 1, backgroundColor: color.whiteSemi}}
        contentContainerStyle={{
          paddingHorizontal: 21,
          paddingBottom: 83,
        }}
        ListHeaderComponent={
          <View
            style={{
              backgroundColor: color.primary,
              paddingVertical: 16,
              paddingBottom: 32,
              paddingHorizontal: 18,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: -21,
              marginBottom: 21,
            }}>
            {loading ? (
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item
                  width={104}
                  height={104}
                  borderRadius={12}
                />
                <SkeletonPlaceholder.Item
                  height={16}
                  marginTop={12}
                  width="100%"
                />
              </SkeletonPlaceholder>
            ) : (
              <>
                <View
                  style={{
                    padding: 4,
                    backgroundColor: color.statusbar,
                    borderRadius: 12,
                    elevation: 3,
                  }}>
                  <Image
                    source={{uri: data.image}}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 12,
                    }}
                    resizeMode="cover"
                  />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 24,
                    color: color.white,
                    fontFamily: 'Montserrat-Bold',
                    marginTop: 12,
                  }}>
                  {data.name}
                </Text>
              </>
            )}
          </View>
        }
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item}) => (
          <SongList
            loading={loading}
            title={item.title}
            artist={item.artist}
            artwork={item.artwork}
          />
        )}
      />
      {!loading || data.list?.length > 0 ? (
        <View
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            paddingVertical: 16,
            paddingHorizontal: 21,
            position: 'absolute',
            backgroundColor: color.whiteSemi,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setPlayer()}
            style={{
              height: 46,
              backgroundColor: color.secondary,
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              flex: 1,
              marginRight: 16,
            }}>
            <PlayIcon width={16} height={16} fill={color.white} />
            <Text
              style={{
                marginLeft: 12,
                fontFamily: 'Montserrat-Bold',
                color: color.white,
                fontSize: 16,
              }}>
              Mainkan Playlist
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (hasSaved) {
                dispatch({type: 'delete', value: indexSaved});
              } else {
                dispatch({
                  type: 'add',
                  value: {
                    url: route.params.url,
                    name: data.name,
                    image: data.image,
                  },
                });
              }
            }}
            style={{
              height: 46,
              width: 46,
              borderRadius: 6,
              backgroundColor: hasSaved ? color.white : color.primary,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <BookmarkIcon
              width={20}
              height={20}
              fill={hasSaved ? color.primary : color.white}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
