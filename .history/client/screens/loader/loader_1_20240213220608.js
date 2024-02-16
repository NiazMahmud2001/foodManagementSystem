import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Video from 'react-native-video';

const Loader_1 = () => {
  return (
    <View>
    <Video source={{uri: "../../assets/loader-3.mp4"}} 
      ref={(ref) => {
        this.player = ref
      }}   
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