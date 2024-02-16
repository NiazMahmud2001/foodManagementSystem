import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Video,{VideoRef} from 'react-native-video';

const background = require('../../assets/loader_3.mp4');

const Loader_1 = () => {
  return (
    <View>
    <Video 
    // Can be a URL or a local file.
    source={background}
    // Store reference  
    ref={VideoRef}
    // Callback when remote video is buffering                                      
    onBuffer={onBuffer}
    // Callback when video cannot be loaded              
    onError={onError}               
    style={styles.backgroundVideo}
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