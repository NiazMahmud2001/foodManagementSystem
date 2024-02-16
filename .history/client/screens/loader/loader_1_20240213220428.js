import { View, Text } from 'react-native'
import React from 'react'
import Video from 'react-native-video';

const Loader_1 = () => {
  return (
    <View>
    <Video source={require("../../assets/loader-3.mp4")} 
                                            
      />
    </View>
  )
}

export default Loader_1