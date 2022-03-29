import React from 'react';
import {LogBox} from 'react-native';
import Duolingo from './pages/Duolingo';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <Duolingo />
    </SafeAreaProvider>
  );
};

export default App;

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
