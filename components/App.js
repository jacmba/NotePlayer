/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {View, StatusBar, StyleSheet, Text} from 'react-native';
import * as fs from 'react-native-fs';

const dir = '/storage/'; // '/WhatsApp/Media/WhatsApp VoiceNotes';

const App: () => Node = () => {
  //const [files, setFiles] = useState();
  fs.readDir(dir).then(console.log).catch(console.error);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View contentInsetAdjustmentBehavior="automatic" style={styles.container}>
        <Text>Hello Voice Note Player</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default App;
