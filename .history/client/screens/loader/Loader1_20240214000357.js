import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import { Video, ResizeMode } from 'expo-av';


const Loader1 = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
          <Video
                ref={video}
                style={styles.backgroundVideo}
                source={require("../../assets/loader_3.mp4")}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    justifyContent:"center",
    alignItems: "center",
    backgroundColor: "rgba(250,150,150,1)",
    zIndex: 1,
  }, 
  backgroundVideo: {
    position: 'absolute',
    width: 300, 
    height: 300,
    
  },
  buttons:{
    margin: 10
  }
})

export default Loader1;