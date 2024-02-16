import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import { Video, ResizeMode } from 'expo-av';
import {Dimensions} from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Loader1 = () => {
  const video = React.useRef(null);
  const [status, setStatus] = useState(false);
  return (
    <View style={styles.container}>
          <Video
                ref={video}
                style={styles.backgroundVideo}
                source={require("../../assets/loader_3.mp4")}
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onError={()=>{
                  console.log("error occur in loader file")
                }}
                shouldPlay
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    display: "flex",
    justifyContent:"center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,1)",
    zIndex: 1,
    width: windowWidth,
    height: windowHeight,
  }, 
  backgroundVideo: {
    position: 'absolute',
    width: 150, 
    height: 150,
    
  },
})

export default Loader1;