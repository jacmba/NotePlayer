import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import Play from './Play';

const TrackItem = ({track}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playEvent, setPlayEvent] = useState(undefined);
  const [totalTime, setTotaltime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      console.log('Sound playing. Current time:', currentTime);
      setTimeout(
        async () => setCurrentTime((await SoundPlayer.getInfo()).currentTime),
        1000,
      );
    }
  });

  return (
    <View style={!isPlaying ? styles.card : styles.card_playing}>
      <TouchableOpacity
        onPress={async () => {
          if (playEvent) {
            playEvent.remove();
          }
          SoundPlayer.stop();
          const uri = 'file://' + track.path;
          SoundPlayer.playUrl(uri);
          setIsPlaying(true);
          setCurrentTime(0);
          setTotaltime((await SoundPlayer.getInfo()).duration);

          const ev = SoundPlayer.addEventListener('FinishedPlaying', () => {
            setIsPlaying(false);
            if (playEvent) {
              playEvent.remove();
            }
            console.log('Finished playing', track.path);
          });
          setPlayEvent(ev);
          console.log('Playing', track.path);
        }}>
        <Text style={styles.field}>
          Name: <Text style={styles.info}>{track.name}</Text>
        </Text>
        <Text style={styles.field}>
          Size:{' '}
          <Text style={styles.info}>
            {+parseFloat(Number(track.size) / 1024).toFixed(2)}KB
          </Text>
        </Text>
        {isPlaying ? (
          <Play currentTime={currentTime} totalTime={totalTime} />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    borderColor: 'lime',
    backgroundColor: 'black',
  },
  card_playing: {
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    borderColor: 'lime',
    backgroundColor: 'darkslategrey',
  },
  field: {
    fontSize: 14,
    fontWeight: '800',
    color: 'cyan',
    fontFamily: 'Ubuntu-Regular',
  },
  info: {
    fontSize: 12,
    fontWeight: '100',
    color: 'white',
    fontFamily: 'Ubuntu-Regular',
  },
});

export default TrackItem;
