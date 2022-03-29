import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    paddingLeft: 16,
  },
});

const Header = () => {
  return (
    <View>
      <Text style={styles.title}>Drag and Drop</Text>
    </View>
  );
};

export default Header;
