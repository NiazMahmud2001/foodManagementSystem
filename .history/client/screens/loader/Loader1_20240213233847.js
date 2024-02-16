import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Video from 'react-native-video';


const Loader1 = () => {
  const video = React.useRef(null)
  const secondVideo = React.useRef(null)
  const {status , setStatus} = useState({})
  return (
    <View style={styles.container}>
        <Video 
            source={require("../../assets/loader_3.mp4")}   // Can be a URL or a local file.
            style={styles.backgroundVideo}  
        />
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
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})

export default Loader1;