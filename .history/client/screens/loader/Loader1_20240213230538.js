import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const Loader1 = () => {
  return (
    <LottieView source={require('../../assets/loader01.json')} autoPlay loop />
  )
}

export default Loader1