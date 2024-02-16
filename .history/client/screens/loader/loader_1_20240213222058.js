import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Video from 'react-native-video';
import Liona from '../assets/loader_3.mp4';

const Loader_1 = () => {
  return (
    
      <Video  
          source={Liona}                  // the video file
          paused={false}                  // make it start    
          style={styles.backgroundVideo}  // any style you want
          repeat={true}                   // make it a loop
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

export default Loader_1