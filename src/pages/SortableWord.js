import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useVector} from 'react-native-redash';
import Placeholder from '../components/Placeholder';
import {
  calculateLayout,
  lastOrder,
  MARGIN_LEFT,
  MARGIN_TOP,
  remove,
  SENTENCE_HEIGHT,
  WORD_HEIGHT,
} from './Layout';

let left = [];
let right = [];

const SortableWord = ({offsets, index, children, containerWidth}) => {
  const [selectedLeft, setSelectedLeft] = useState(false);
  const [selectedRight, setSelectedRight] = useState(false);

  const offset = offsets[index];
  const isGestureActive = useSharedValue(false);
  const isDropped = useSharedValue(false);
  const isAnimating = useSharedValue(false);
  const isCenter = useSharedValue(0);
  const translation = useVector();
  const isInBank = useDerivedValue(() => offset.order.value === -1);

  useEffect(() => {
    if (selectedLeft !== false) {
      left.push(selectedLeft);
    }
  }, [selectedLeft]);

  useEffect(() => {
    if (selectedRight !== false) {
      right.push(selectedRight);
    }
  }, [selectedRight]);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      if (isInBank.value) {
        translation.x.value = offset.originalX.value - MARGIN_LEFT;
        translation.y.value = offset.originalY.value + MARGIN_TOP;
      } else {
        translation.x.value = offset.x.value;
        translation.y.value = offset.y.value;
      }
      ctx.x = translation.x.value;
      ctx.y = translation.y.value;
      isGestureActive.value = true;
    },
    onActive: ({translationX, translationY}, ctx) => {
      translation.x.value = ctx.x + translationX;
      translation.y.value = ctx.y + translationY;
      if (translation.x.value <= 70 && translation.y.value < 0) {
        isCenter.value = 30;
      } else if (translation.x.value >= 90 && translation.y.value < 0) {
        isCenter.value = 240;
      }
      if (isInBank.value && translation.y.value < 0) {
        offset.order.value = lastOrder(offsets);
        calculateLayout(offsets, containerWidth);
      } else if (!isInBank.value && translation.y.value > SENTENCE_HEIGHT) {
        offset.order.value = -1;
        remove(offsets, index);
        calculateLayout(offsets, containerWidth);
      }
    },
    onEnd: ({velocityX, velocityY}) => {
      isAnimating.value = true;
      isGestureActive.value = false;
      translation.x.value = withSpring(
        offset.x.value,
        {velocity: velocityX},
        () => (isAnimating.value = false),
      );
      translation.y.value = withSpring(offset.y.value, {velocity: velocityY});

      if (isCenter.value === 30) {
        isDropped.value = true;
        runOnJS(setSelectedLeft)(index);
      } else if (isCenter.value === 240) {
        isDropped.value = true;
        runOnJS(setSelectedRight)(index);
      }
    },
  });

  const translateX = useDerivedValue(() => {
    if (isGestureActive.value) {
      return translation.x.value;
    }
    return withTiming(
      isInBank.value ? offset.originalX.value - MARGIN_LEFT : isCenter.value,
    );
  });

  const translateY = useDerivedValue(() => {
    if (isGestureActive.value) {
      return translation.y.value;
    }
    return withTiming(
      isInBank.value
        ? offset.originalY.value + MARGIN_TOP
        : offset.originalY.value - MARGIN_TOP / 1.3,
    );
  });

  const style = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: isGestureActive.value || isAnimating.value ? 100 : 0,
      width: offset.width.value,
      height: WORD_HEIGHT,
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
      opacity: isDropped.value ? withTiming(0) : 1,
    };
  });

  return (
    <>
      <Placeholder offset={offset} />
      <Animated.View style={style}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={StyleSheet.absoluteFill}>
            {children}
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </>
  );
};

export default SortableWord;
