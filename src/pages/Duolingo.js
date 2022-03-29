import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Header from '../components/Header';
import Word from './Word';
import WordList from './WordList';

const words = [
  {id: 1, word: 'adalah'},
  {id: 2, word: 'Ini'},
  {id: 3, word: 'testing'},
  {id: 4, word: '.'},
  {id: 5, word: 'drop'},
  {id: 6, word: 'drag'},
  {id: 7, word: 'aplikasi'},
  {id: 8, word: 'and'},
  {id: 9, word: 'Enak'},
  {id: 10, word: 'Manis'},
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const Duolingo = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Header />
      <WordList>
        {words.map(word => (
          <Word key={word.id} {...word} />
        ))}
      </WordList>
    </GestureHandlerRootView>
  );
};

export default Duolingo;
