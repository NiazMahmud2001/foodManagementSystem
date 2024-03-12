import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { CameraView, Camera } from 'expo-camera/next';
import { Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as FileSystem from 'expo-file-system';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class CamScan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasPermission: null,
      scanned: false,
      facing: 'back',
      barcodeData: '',
      isScanningBarcode: true,
      cameraRef: React.createRef(),
      filteredDate: '00/00/0000',
      isScanningExpDate: false,
    };
  }

  componentDidMount() {
    this.getCameraPermissions();
  }

  getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    this.setState({ hasPermission: status === 'granted' });
  };

  toggleCameraFacing = () => {
    this.setState((prevState) => ({
      facing: prevState.facing === 'back' ? 'front' : 'back',
    }));
  };

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true, isScanningBarcode: false, barcodeData: data });
  };

  checkImageSize = async (img) => {
    const { size } = await FileSystem.getInfoAsync(img.uri);
    const sizeInMB = size / (1024 * 1024); // Convert size to MB;
    console.log('Image size: ', sizeInMB, 'MB');
  };

  getExpDate = (inputString) => {
    console.log('the length of scanned string is:', inputString.length);
    // code for searching: 21/01/2025
    const pattern = /(\d{2}\/){2}\d{4}/g;
    let matches = inputString.match(pattern);

    console.log('match string is: ', matches);
    if (matches) {
      if (matches.length === 1) {
        this.setState({ filteredDate: matches[0] });
        console.log('Matched patterns:', matches[0]);
      } else if (matches.length > 1) {
        this.setState({ filteredDate: matches[1] });
        console.log('Matched patterns:', matches[1]);
      } else {
        // code for searching: 21 01 2025
        pattern = /\d{2} \d{2} \d{4}/;
        matches = inputString.match(pattern);
        if (matches.length === 1) {
          this.setState({ filteredDate: matches[0] });
          console.log('Matched patterns:', matches[0]);
        } else if (matches.length > 1) {
          this.setState({ filteredDate: matches[1] });
          console.log('Matched patterns:', matches);
        } else {
          this.setState({ filteredDate: '00/00/0000' });
        }
      }
    } else {
      this.setState({ filteredDate: '00/00/0000' });
      console.log('no match found!!!');
    }
  };

  analyzeImg = async (baseImage) => {
    const apiKey = 'YOUR_GOOGLE_VISION_API_KEY'; // Replace with your actual API key
    const api_url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    const imageUri = baseImage;
    const imageBuffer = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const body = {
      requests: [
        {
          image: {
            content: imageBuffer,
          },
          features: [
            {
              type: 'TEXT_DETECTION',
              maxResults: 1,
            },
          ],
        },
      ],
    };
    const response = await fetch(api_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    const detectedText = result.responses[0]?.textAnnotations?.[0]?.description || 'No text detected';
    console.log('callGoogleVisionAsync -> result', detectedText);
    this.getExpDate(detectedText);
    console.log('==============================================================');
  };

  scannerOfExp = async () => {
    const opts = {
      quality: 1,
      base64: true,
      exif: false,
      imageType: 'jpg',
    };
    const photo = await this.state.cameraRef.current.takePictureAsync(opts);

    this.analyzeImg(photo.uri);
  };

  moveEnterFoodWithBarCodePage = () => {
    const { barcodeData, filteredDate } = this.state;
    this.props.navigation.navigate('EnterFoodWithBarCode', {
      barcodess: barcodeData,
      expDate: filteredDate,
    });
  };

  render() {
    const { hasPermission, scanned, isScanningBarcode, facing } = this.state;

    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={styles.outerView}>
        <View style={styles.topView}>
          <Text style={styles.topStyleText}>
            {isScanningBarcode
              ? 'Please Scan products Barcode'
              : 'Please Scan products Exp date'}
          </Text>
        </View>
        <View style={styles.container}>
          {isScanningBarcode ? (
            <View style={styles.barcodeScanCam}>
              <CameraView
                onBarcodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                barcodeScannerSettings={{
                  barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                }}
                facing={facing}
                style={StyleSheet.absoluteFillObject}
              />
            </View>
          ) : (
            <View style={styles.expDateScanCam}>
              <CameraView
                CameraMode="picture"
                ref={this.state.cameraRef}
                style={StyleSheet.absoluteFillObject}
                zoom={0.5}
              />
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.flipCam} onPress={this.toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          {scanned && (
            <TouchableOpacity style={styles.button} onPress={() => this.setState({ scanned: false })}>
              <Text>TAP TO SCAN AGAIN</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.buttonContainer2}>
          {scanned && (
            <View style={styles.bottomButtonCont}>
              <TouchableOpacity style={styles.button} onPress={this.scannerOfExp}>
                <Text>Scan Exp Date</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={this.moveEnterFoodWithBarCodePage}>
                <Text>Next {' >>'} </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: windowWidth,
    height: windowHeight,
  },
  topStyleText: {
    fontSize: 17,
    marginBottom: 20,
    borderBottomWidth: 2,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 35,
  },
  buttonContainer2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: windowWidth,
    height: windowHeight / 2,
  },
  barcodeScanCam: {
    width: windowWidth,
    height: windowHeight / 2,
  },
  expDateScanCam: {
    width: windowWidth,
    height: windowHeight / 5.5,
  },
  flipCam: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 155,
    height: 50,
    borderWidth: 0.5,
    borderColor: '#000',
    marginBottom: 30,
    marginRight: 40,
    borderRadius: 10,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 170,
    height: 50,
    borderWidth: 0.5,
    borderColor: '#000',
    marginBottom: 30,
    borderRadius: 10,
  },
  bottomButtonCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: windowWidth - 10,
  },
});

export default CamScan;
