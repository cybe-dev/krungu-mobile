import React from 'react';
import {FlatList, View, Text} from 'react-native';
import color from '../color';
import PlaylistCard from '../components/PlaylistCard';
import {SavedContext} from '../context/saved';

export default function Saved({navigation}) {
  const {state: data} = React.useContext(SavedContext);

  if (data.length < 1) {
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
          Tidak ada playlist tersimpan
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 19,
        paddingTop: 21,
        paddingBottom: 112,
      }}
      style={{flex: 1, backgroundColor: color.whiteSemi}}
      keyExtractor={(item, index) => `${index}`}
      renderItem={({item}) => (
        <PlaylistCard
          loading={false}
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
