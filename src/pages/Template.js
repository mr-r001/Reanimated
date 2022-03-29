import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Template = () => {
  return (
    <View style={styles.container}>
      <Text>A</Text>
    </View>
  );
};

export default Template;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
