import React from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

const Page = ({index, title, translateX}) => {
  const pageOffset = width * index;

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value + pageOffset}],
    };
  });
  return (
    <Animated.View style={[styles.page(index), rStyle]}>
      <Text style={styles.text}>{title}</Text>
    </Animated.View>
  );
};

export default Page;

const styles = StyleSheet.create({
  page: index => ({
    ...StyleSheet.absoluteFillObject,
    backgroundColor: `rgba(0,0,256, 0.${index + 1})`,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  text: {
    fontSize: 70,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
