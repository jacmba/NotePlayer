/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  PermissionsAndroid,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import * as fs from 'react-native-fs';
import TrackItem from './TrackItem';

const dir =
  fs.ExternalStorageDirectoryPath + '/WhatsApp/Media/WhatsApp Voice Notes';

const App: () => Node = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (granted) {
        try {
          const fileList = await (
            await fs.readDir(dir)
          )
            .filter(d => !d.name.startsWith('.') && d.isDirectory())
            .reduce(async (list, d) => {
              try {
                const ls = (await fs.readDir(d.path))
                  .filter(f => !f.name.startsWith('.') && f.isFile())
                  .map(f => ({name: f.name, path: f.path, size: f.size}));
                return [...list, ...ls];
              } catch (e) {
                console.error('Error reading voice note folder', e);
                return list;
              }
            }, []);
          setFiles(fileList);
          console.log('Directory files', fileList);
        } catch (e) {
          setFiles([]);
          console.error(`Error reading from ${dir}`, e);
        }
      } else {
        ToastAndroid.show(
          'Permission to read files denied!',
          ToastAndroid.LONG,
        );
      }
    };

    fetchPermissions();
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View contentInsetAdjustmentBehavior="automatic" style={styles.container}>
        <Text style={styles.header}>Whatsapp Voice Note Player</Text>
        <ScrollView style={styles.view}>
          {files && files.length > 0
            ? files.map(f => <TrackItem key={f.name} track={f} />)
            : null}
        </ScrollView>
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
    flexDirection: 'column',
    backgroundColor: 'black',
    height: '100%',
    flex: 1,
    textAlignVertical: 'top',
  },
  header: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '600',
    color: 'magenta',
    fontFamily: 'Ubuntu-Regular',
  },
  view: {
    marginTop: 15,
    width: '100%',
  },
});

export default App;
