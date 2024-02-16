import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Video from 'react-native-video';
import loader-3 from '../../assets/loader-3.mp4';

const Loader_1 = () => {
  return (
    <View>
      <Video  
          source={video}                  // the video file
          paused={false}                  // make it start    
          style={styles.backgroundVideo}  // any style you want
          repeat={true}                   // make it a loop
      />
    </View>
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