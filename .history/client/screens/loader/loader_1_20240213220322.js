import { View, Text } from 'react-native'
import React from 'react'
import Video from 'react-native-video';

const Loader_1 = () => {
  return (
    <View>
    <Video source={require("../../assets/loader-3.mp4")} 
        ref={(ref) => {
          this.player = ref
        }}                                     
        onBuffer={this.onBuffer}               
        onError={this.videoError}              
        style={styles.backgroundVideo} 
      />
    </View>
  )
}

export default Loader_1