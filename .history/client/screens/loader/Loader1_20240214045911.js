import { View, Text, StyleSheet, Button, Animated} from 'react-native'
import React, { useState } from 'react'
import { Video, ResizeMode } from 'expo-av';
import {Dimensions} from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Loader1 = () => {
  const position = new Animated.ValueXY({x:0 , y:0}); 
  Animated.spring(position,{
      toValue: {x: -390, y:0} , 
      duration: 4000,
      delay: 4000,
      speed: 0.4,
      bounciness: 1,
      useNativeDriver: true,
  }).start()

  const video = React.useRef(null);
  return (
    <Animated.View style={[styles.container , {
                transform : [
                  {translateX: position.x}, 
                  {translateY: position.y}
                ]
            }
        ]}>
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
    </Animated.View>
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
    position: "absolute", 
    zIndex: 10000,
    borderRightColor: "black",
    borderRightWidth: 1,
  }, 
  backgroundVideo: {
    position: 'absolute',
    width: 150, 
    height: 150,
    zIndex: 100000000
  },
})

export default Loader1











