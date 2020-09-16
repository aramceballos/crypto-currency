import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, SectionList } from 'react-native';
import colors from '../../res/colors';

const CoinDetailScreen = ({ navigation, route }) => {
  const { coin } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: coin.symbol });
  }, []);

  const getCoinIcon = (coinNameStr) => {
    if (coinNameStr) {
      const coinName = coinNameStr.toLowerCase().replace(' ', '-');

      return `https://c1.coinlore.com/img/25x25/${coinName}.png`;
    }
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
        <Image
          source={{
            uri: getCoinIcon(coin.nameid),
          }}
          style={styles.coinImg}
        />
        <Text style={styles.titleText}>{coin.name}</Text>
      </View>
      <SectionList
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
});
