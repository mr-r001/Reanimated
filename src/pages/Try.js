import React, {useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const SIZE = 300;

const Try = () => {
  const width = useSharedValue(300);
  const borderRadius = useSharedValue(12);
  const opacity = useSharedValue(1);
  const borderWidth = useSharedValue(0);
  const borderColor = useSharedValue('black');
  const backgroundColor = useSharedValue('yellow');
  const color = useSharedValue('black');

  const onSingleTap = useCallback(() => {
    'worklet';
    backgroundColor.value = withTiming('#1E1E1E');
    color.value = withTiming('#F8F8F8', undefined, isFinished => {
      if (isFinished) {
        width.value = withTiming(SIZE / 5, {
          duration: 700,
        });
        borderWidth.value = withDelay(300, withTiming(2));
        backgroundColor.value = withDelay(
          300,
          withTiming('#F8F8F8', undefined, isReady => {
            if (isReady) {
              borderColor.value = withTiming(
                '#C8C8C8',
                undefined,
                isSuccess => {
                  if (isSuccess) {
                    width.value = withDelay(
                      1000,
                      withTiming(SIZE, {
                        duration: 1000,
                      }),
                    );
                    borderWidth.value = withDelay(1000, withTiming(0));
                    backgroundColor.value = withDelay(
                      1000,
                      withTiming('yellow'),
                    );
                    opacity.value = withDelay(1000, withSpring(1));
                    color.value = withDelay(1000, withTiming('#1E1E1E'));
                    borderRadius.value = withDelay(1000, withTiming(12));
                  }
                },
              );
            }
          }),
        );
        opacity.value = withDelay(100, withTiming(0));
        borderRadius.value = withTiming(30);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buttonStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
      width: width.value,
      borderRadius: borderRadius.value,
      borderWidth: borderWidth.value,
      borderColor: borderColor.value,
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      color: color.value,
    };
  });

  return (
    <View style={styles.container}>
      <TapGestureHandler onActivated={onSingleTap}>
        <Animated.View>
          <Animated.View style={[styles.button, buttonStyle]}>
            <Animated.Text style={[styles.text, textStyle]}>
              Sign Up
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
};

export default Try;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'yellow',
    height: SIZE / 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: 'black',
  },
});
