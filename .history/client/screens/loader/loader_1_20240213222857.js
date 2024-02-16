import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Video from 'react-native-video';


const Loader_1 = () => {
  return (
    <View>
      <Video  
          source={require("../../assets/loader_3.mp4")}                  // the video file
          videoWidth = {1600}
          videoHeight= {1600}
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