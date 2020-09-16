import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../res/colors';
import FavoritesEmptyState from './FavoritesEmptyState';

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <FavoritesEmptyState />
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
