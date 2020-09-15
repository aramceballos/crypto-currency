import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const CoinsItem = ({ coin, handlePress }) => {
  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <Text>{coin.name}</Text>
        <Text>{coin.symbol}</Text>
        <Text>${coin.price_usd}</Text>
      </View>
    </Pressable>
  );
};

export default CoinsItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
