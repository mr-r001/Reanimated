/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {runOnJS, runOnUI, useSharedValue} from 'react-native-reanimated';
import {MARGIN_LEFT} from './Layout';
import SortableWord from './SortableWord';

const containerWidth = Dimensions.get('window').width - MARGIN_LEFT * 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: MARGIN_LEFT,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  square: {
    width: (Dimensions.get('screen').width * 30) / 100,
    height: (Dimensions.get('screen').height * 20) / 100,
    borderWidth: 1,
    borderRadius: 8,
  },
});

const WordList = ({children}) => {
  const [ready, setReady] = useState(false);
  const offsets = children.map(() => ({
    order: useSharedValue(0),
    width: useSharedValue(0),
    height: useSharedValue(0),
    x: useSharedValue(0),
    y: useSharedValue(0),
    originalX: useSharedValue(0),
    originalY: useSharedValue(0),
  }));

  if (!ready) {
    return (
      <View style={styles.row}>
        {children.map((child, index) => {
          return (
            <View
              key={index}
              onLayout={({
                nativeEvent: {
                  layout: {x, y, width, height},
                },
              }) => {
                const offset = offsets[index];
                offset.order.value = -1;
                offset.width.value = width;
                offset.height.value = height;
                offset.originalX.value = x;
                offset.originalY.value = y;
                runOnUI(() => {
                  'worklet';
                  if (offsets.filter(o => o.order.value !== -1).length === 0) {
                    runOnJS(setReady)(true);
                  }
                })();
              }}>
              {child}
            </View>
          );
        })}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={styles.square} />
        <View style={styles.square} />
      </View>

      <View style={styles.row}>
        {children.map((child, index) => {
          return (
            <SortableWord
              key={index}
              offsets={offsets}
              index={index}
              containerWidth={containerWidth}>
              {child}
            </SortableWord>
          );
        })}
      </View>
    </View>
  );
};

export default WordList;
