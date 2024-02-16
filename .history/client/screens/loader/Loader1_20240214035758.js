import { View, Text, StyleSheet, Button, Animated} from 'react-native'
import React, { createContext, useState } from 'react'
import { Video, ResizeMode } from 'expo-av';
import {Dimensions} from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const contextProvider = createContext();

const Loader1 = () => {
  const [moveLoader , setMoveLoader] = useState(false)
  const position = new Animated.ValueXY({x:0 , y:0}); 
  Animated.timing(position,{
      toValue: {x: 100, y:0} , 
      duration: 2000,
      useNativeDriver: true,
  }).start()

  const video = React.useRef(null);
  return (
    <contextProvider.Provider>
        <View style={[styles.container , moveLoader&&{
                transform : [
                  {translateX: position.x}, 
                  {translateY: position.y}
                ],
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
          /></View>
    </contextProvider.Provider>
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