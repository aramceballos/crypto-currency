import React from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import colors from '../../res/colors';

const CoinsItem = ({ coin }) => {
  const getImgArrow = () => {
    if (coin.percent_change_1h > 0) {
      return require('../../assets/arrow_up.png');
    } else {
      return require('../../assets/arrow_down.png');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{coin.symbol}</Text>
        <Text style={styles.nameText}>{coin.name}</Text>
        <Text style={styles.priceText}>${coin.price_usd}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percentText}>{coin.percent_change_1h}%</Text>
        <Image source={getImgArrow()} style={styles.imgArrow} />
      </View>
    </View>
  );
};

export default CoinsItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    borderBottomColor: colors.zircon,
    borderBottomWidth: 1,
    marginLeft: Platform.OS === 'ios' ? 16 : 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  symbolText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 12,
  },
  nameText: {
    fontSize: 14,
    color: '#fff',
    marginRight: 16,
  },
  priceText: {
    fontSize: 12,
    color: '#fff',
  },
  percentText: {
    color: '#fff',
    fontSize: 12,
    marginRight: 8,
  },
  imgArrow: {
    width: 22,
    height: 22,
  },
});
