import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import {Video} from 'expo-av'


const Loader1 = () => {
  const video = React.useRef(null)
  const secondVideo = React.useRef(null)
  const {status , setStatus} = useState({})
  return (
    <View style={styles.container}>
      <Video
        source={require("../../assets/loader_3.mp4")}
        style = {styles.vids}
        useNativeControls
        resizeMode='contain'
        isLooping
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
  vids:{
    flex: 1,
    alignSelf: "stretch",
    width: 100 ,
    height: 200
  }
})

export default Loader1;