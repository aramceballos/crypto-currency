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
import colors from '../../res/colors';

const CoinsScreen = () => {
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

  const keyExtractor = (item) => item.id.toString();

  const renderItem = ({ item }) => <CoinsItem coin={item} />;

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      )}
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
  container: {
    backgroundColor: colors.charade,
    flex: 1,
  },
  loader: {
    marginTop: 60,
  },
});
