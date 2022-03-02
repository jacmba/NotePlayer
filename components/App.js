/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {View, StatusBar, StyleSheet, Text} from 'react-native';

const App: () => Node = () => {
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
  },
});

export default App;
