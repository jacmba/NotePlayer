import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import SoundPlayer from 'react-native-sound-player';

const TrackItem = ({track}) => (
  <View>
    <TouchableOpacity
      onPress={() => {
        const uri = 'file://' + track.path;
        SoundPlayer.playUrl(uri);
      }}>
      <Text>Name: {track.name}</Text>
      <Text>Size: {+parseFloat(Number(track.size) / 1024).toFixed(2)}KB</Text>
    </TouchableOpacity>
  </View>
);

export default TrackItem;
