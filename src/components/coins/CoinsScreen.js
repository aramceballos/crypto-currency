import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const CoinsScreen = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('CoinDetail');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coins Screen</Text>
      <Pressable onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Go to Detail</Text>
      </Pressable>
    </View>
  );
};

export default CoinsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  title: {
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
