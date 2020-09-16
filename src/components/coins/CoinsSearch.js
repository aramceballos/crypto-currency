import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Platform } from 'react-native';
import colors from '../../res/colors';

const CoinsSearch = ({ onChange }) => {
  const [text, setText] = useState('');

  const handleChange = (query) => {
    setText(query);

    if (onChange) {
      onChange(query);
    }
  };

  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS === 'ios' ? styles.textInputIOS : styles.textInputAndroid,
        ]}
        value={text}
        onChangeText={handleChange}
        placeholder="Search Coin"
        placeholderTextColor="#fff"
      />
    </View>
  );
};

export default CoinsSearch;

const styles = StyleSheet.create({
  textInput: {
    paddingLeft: 16,
    color: '#fff',
  },
  textInputIOS: {
    height: 37,
    fontSize: 16,
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 10,
    backgroundColor: colors.blackPearl,
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: colors.zircon,
    backgroundColor: colors.charade,
    height: 46,
  },
});
