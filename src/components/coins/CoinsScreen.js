import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Http from '../../lib/http';
import CoinsItem from './CoinsItem';

const CoinsScreen = ({ navigation }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      setLoading(true);
      const { data } = await Http.instance.get(
        'https://api.coinlore.net/api/tickers/',
      );

      setCoins(data);
      setLoading(false);
    })();
  }, []);

  const handlePress = () => {
    navigation.navigate('CoinDetail');
  };

  const keyExtractor = (item) => item.id.toString();

  const renderItem = ({ item }) => (
    <CoinsItem coin={item} handlePress={handlePress} />
  );

  return (
    <View>
      <Text>Coins Screen</Text>
      {loading && <ActivityIndicator size="large" style={styles.loader} />}
      <FlatList
        data={coins}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};

export default CoinsScreen;

const styles = StyleSheet.create({
  loader: {
    marginTop: 60,
  },
});
