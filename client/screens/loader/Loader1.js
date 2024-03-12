import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native'; // Import Animated module
import { Video, ResizeMode } from 'expo-av';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Loader1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: new Animated.ValueXY({ x: 0, y: 0 }),
    };

    Animated.timing(this.state.position, {
      toValue: { x: -390, y: 0 },
      duration: 3000,
      delay: 4000,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const { position } = this.state;

    return (
      <View style={[styles.container]}>
        <Video
          style={styles.backgroundVideo}
          source={require('../../assets/loader_3.mp4')}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onError={() => {
            console.log('Error occurred in loader file');
          }}
          shouldPlay
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
    zIndex: 1,
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    zIndex: 10000,
    borderRightColor: 'black',
    borderRightWidth: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    width: 150,
    height: 150,
    zIndex: 100000000,
  },
});

export default Loader1;
