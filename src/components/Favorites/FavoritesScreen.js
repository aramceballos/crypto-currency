import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Storage from '../../lib/storage';
import colors from '../../res/colors';
import CoinsItem from '../Coins/CoinsItem';
import FavoritesEmptyState from './FavoritesEmptyState';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', getFavorites);
    return () => {
      navigation.removeListener('focus', getFavorites);
    };
  }, []);

  const getFavorites = async () => {
    try {
      const keys = await Storage.instance.getAllKeys();

      const favs = await Storage.instance.multiGet(keys);

      const favsParsed = favs.map((item) => JSON.parse(item[1]));

      setFavorites(favsParsed);
    } catch (error) {
      console.log('get favorites err', error);
    }
  };

  const handlePress = (coin) => {
    navigation.navigate('CoinDetail', { coin });
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? <FavoritesEmptyState /> : null}
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CoinsItem coin={item} onPress={() => handlePress(item)} />
          )}
        />
      ) : null}
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
});
