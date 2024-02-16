import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Video,{VideoRef} from 'react-native-video';

const background = require('../../assets/loader_3.mp4');

const Loader1 = () => {
  return (
    <Video 
      source={background}                     
      style={styles.backgroundVideo}
   />
  )
}

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default Loader1