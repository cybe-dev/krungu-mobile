import React from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import color from '../color';
import PlaylistCard from '../components/PlaylistCard';
import service from '../service';

export default function Home({navigation}) {
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState([{}, {}, {}, {}]);

  const getData = (
    beforeLoad = () => {},
    loadSuccess = () => {},
    loadError = () => {},
  ) => {
    beforeLoad();
    service
      .get('/index.json')
      .then(response => {
        loadSuccess(response);
      })
      .catch(e => {
        loadError(e);
      });
  };

  React.useEffect(() => {
    getData(
      () => {
        setLoading(true);
      },
      response => {
        setData(response.data);
        setLoading(false);
      },
      () => {
        setLoading(false);
      },
    );
  }, []);

  return (
    <FlatList
      data={data}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            getData(
              () => {
                setRefreshing(true);
              },
              response => {
                setData(response.data);
                setRefreshing(false);
              },
              () => {
                setRefreshing(false);
              },
            );
          }}
        />
      }
      numColumns={2}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View
          style={{
            backgroundColor: color.primary,
            marginHorizontal: -19,
            marginBottom: 21,
            paddingHorizontal: 21,
            height: 120,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: 'Montserrat-Bold',
              color: color.white,
            }}>
            Discover
          </Text>
          <Text
            style={{
              fontFamily: 'MerriweatherSans-Regular',
              color: color.whiteSemi,
            }}>
            Pilihan daftar putar dari kami
          </Text>
        </View>
      }
      contentContainerStyle={{paddingHorizontal: 19, paddingBottom: 112}}
      style={{flex: 1, backgroundColor: color.whiteSemi}}
      keyExtractor={(item, index) => `${index}`}
      renderItem={({item}) => (
        <PlaylistCard
          loading={loading}
          image={item.image}
          name={item.name}
          onPress={() => {
            navigation.navigate('PlaylistDetail', {url: item.url});
          }}
        />
      )}
    />
  );
}
