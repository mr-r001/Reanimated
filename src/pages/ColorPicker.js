import 'react-native-gesture-handler';
import React, {useCallback} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Picker from '../components/ColorPicker';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const COLORS = [
  'red',
  'purple',
  'blue',
  'cyan',
  'green',
  'yellow',
  'orange',
  'black',
  'white',
];

const BACKGROUND_COLOR = 'rgba(0,0,0,0.9)';
const {width} = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.8;
const PICKER_WIDTH = width * 0.9;

const ExampleWithHoc = gestureHandlerRootHOC(
  ({colors, start, end, style, maxWidth, onColorChanged}) => (
    <View style={styles.bottomContainer}>
      <Picker
        colors={colors}
        start={start}
        end={end}
        style={style}
        maxWidth={maxWidth}
        onColorChanged={onColorChanged}
      />
    </View>
  ),
);

const ColorPicker = () => {
  const pickedColor = useSharedValue(COLORS[0]);

  const onColorChanged = useCallback(color => {
    'worklet';
    pickedColor.value = color;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value,
    };
  });

  return (
    <>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.circle, rStyle]} />
      </View>
      <ExampleWithHoc
        colors={COLORS}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradient}
        maxWidth={PICKER_WIDTH}
        onColorChanged={onColorChanged}
      />
    </>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {height: 50, width: PICKER_WIDTH, borderRadius: 20},
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    backgroundColor: 'red',
    borderRadius: CIRCLE_SIZE / 2,
  },
});
