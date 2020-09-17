import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SectionList,
  Pressable,
  FlatList,
  Alert,
} from 'react-native';
import Http from '../../lib/http';
import colors from '../../res/colors';
import CoinMarketItem from './CoinMarketItem';
import Storage from '../../lib/storage';

const CoinDetailScreen = ({ navigation, route }) => {
  const [markets, setMarkets] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const { coin } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: coin.symbol });

    getMarkets(coin.id);

    getFavorite();
  }, []);

  const getFavorite = async () => {
    try {
      const key = `favorite-${coin.id}`;
      const favoriteStr = await Storage.instance.get(key);

      if (favoriteStr !== null) {
        setIsFavorite(true);
      }
    } catch (error) {
      setIsFavorite(false);
    }
  };

  const toggleFavorite = async () => {
    if (isFavorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  const addFavorite = async () => {
    const coinStr = JSON.stringify(coin);
    const key = `favorite-${coin.id}`;

    const stored = await Storage.instance.store(key, coinStr);

    if (stored) {
      setIsFavorite(true);
    }
  };

  const removeFavorite = () => {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${coin.id}`;

          const removed = await Storage.instance.remove(key);

          if (removed) {
            setIsFavorite(false);
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const getCoinIcon = (coinNameStr) => {
    if (coinNameStr) {
      const coinName = coinNameStr.toLowerCase().replace(' ', '-');

      return `https://c1.coinlore.com/img/25x25/${coinName}.png`;
    }
  };

  const getMarkets = async (coinId) => {
    const marketsResponse = await Http.instance.get(
      `https://api.coinlore.net/api/coin/markets/?id=${coinId}`,
    );

    setMarkets(marketsResponse);
  };

  const getSections = () => {
    const sections = [
      {
        title: 'Market Cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];
    return sections;
  };

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image
            source={{ uri: getCoinIcon(coin.nameid) }}
            style={styles.coinImg}
          />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>

        <Pressable
          onPress={toggleFavorite}
          style={[
            styles.btnFavorite,
            isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
          ]}>
          <Text style={styles.btnText}>
            {isFavorite ? 'Remove favorite' : 'Add favorite'}
          </Text>
        </Pressable>
      </View>

      <SectionList
        style={styles.section}
        sections={getSections()}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />

      <Text style={styles.marketsTitle}>Markets</Text>

      <FlatList
        style={styles.list}
        horizontal={true}
        data={markets}
        renderItem={({ item }) => <CoinMarketItem market={item} />}
      />
    </View>
  );
};

export default CoinDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
    flex: 1,
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  coinImg: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 220,
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: '#fff',
    fontSize: 14,
  },
  sectionText: {
    color: '#fff',
    fontSize: 14,
  },
  marketsTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteAdd: {
    backgroundColor: colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: colors.carmine,
  },
  btnText: {
    color: '#fff',
  },
});
