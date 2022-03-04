import React from 'react';
import {View, Text, StyleSheet, ProgressBarAndroid} from 'react-native';
import {getDuration} from '../utils/timeUtils';

const Play = ({currentTime, totalTime}) => (
  <View style={styles.container}>
    <Text style={styles.info}>Playing...</Text>
    <ProgressBarAndroid
      style={styles.progressBar}
      styleAttr="Horizontal"
      indeterminate={false}
      progress={currentTime / totalTime}
    />
    <Text style={styles.info}>
      {getDuration(currentTime).toString()} /{' '}
      {getDuration(totalTime).toString()}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  info: {
    color: 'silver',
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'italic',
    fontFamily: 'Ubuntu-Regular',
  },
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  progressBar: {
    width: '75%',
  },
});

export default Play;
