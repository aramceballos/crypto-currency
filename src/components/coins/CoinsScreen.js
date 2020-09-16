import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import Http from '../../lib/http';
import CoinsItem from './CoinsItem';
import colors from '../../res/colors';
import CoinsSearch from './CoinsSearch';

const CoinsScreen = ({ navigation }) => {
  const [coins, setCoins] = useState([]);
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCoins();
  }, []);

  const getCoins = async () => {
    setLoading(true);
    const { data } = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );

    setCoins(data);
    setAllCoins(data);
    setLoading(false);
  };

  const handlePress = (coin) => {
    navigation.navigate('CoinDetail', { coin });
  };

  const handleSearch = (query) => {
    const coinsFiltered = allCoins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase()) ||
        coin.nameid.toLowerCase().includes(query.toLowerCase())
      );
    });

    setCoins(coinsFiltered);
  };

  return (
    <View style={styles.container}>
      <CoinsSearch onChange={handleSearch} />
      {loading && (
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      )}
      <FlatList
        data={coins}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CoinsItem coin={item} onPress={() => handlePress(item)} />
        )}
      />
    </View>
  );
};

export default CoinsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
    flex: 1,
  },
  loader: {
    marginTop: 60,
  },
});
