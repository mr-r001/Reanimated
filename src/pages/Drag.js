import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  gestureHandlerRootHOC,
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

const Drag = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const draftList = [
    {
      id: 1,
      name: 'Manis',
    },
    {
      id: 2,
      name: 'Asam',
    },
  ];

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: () => {},
    onActive: event => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
    onEnd: () => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.dropContainer}>
        <Text>A</Text>
      </View>
      <View style={styles.listContainer}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.list, rStyle]}>
            <Text style={styles.text}>A</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

export default Drag;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  dropContainer: {
    height: (Dimensions.get('screen').height * 40) / 100,
    backgroundColor: 'gray',
  },
  listContainer: {
    flex: 1,
    padding: 24,
  },
  list: {
    backgroundColor: '#FFFFFF',
    width: (Dimensions.get('screen').width * 90) / 100,
    height: 32,
    borderRadius: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    elevation: 6,
  },
  text: {
    fontSize: 12,
    color: '#000000',
  },
});
