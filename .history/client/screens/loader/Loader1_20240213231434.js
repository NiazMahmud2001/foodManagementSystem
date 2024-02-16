import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const Loader1 = () => {
  return (
    <View style={styles.container}>
      <LottieView 
        source={require('../../assets/loader01.json')} 
        autoPlay 
        loop 
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
  }
})

export default Loader1;