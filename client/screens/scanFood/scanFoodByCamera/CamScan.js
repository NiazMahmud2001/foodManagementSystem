import { Camera , CameraView, useCameraPermissions } from 'expo-camera/next';
import { useState , useEffect} from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Dimensions} from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CamScan = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [facing , setFacing] = useState("back")
    const [precaution_p , setPrecaution_p] = useState("")

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };
        getCameraPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        //console.log(data)
        //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        navigation.navigate("EnterFoodWithBarCode", {
            barcodess: data,
        })
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.outerView}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.flipCam} onPress={toggleCameraFacing}>
                    <Text style={styles.text}>Flip Camera</Text>
                </TouchableOpacity>
                {scanned && 
                    (
                        <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
                            <Text>TAP TO SCAN AGAIN</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            <View style={styles.container}>
                <CameraView
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barcodeScannerSettings={{
                        barCodeTypes:[BarCodeScanner.Constants.BarCodeType.qr]
                    }}
                    facing = {facing}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    outerView:{
        display: "flex", 
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        width: windowWidth,
        height: windowHeight
    },
    buttonContainer:{
        display: "flex", 
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
    },
    container:{
        display: "flex", 
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        width: windowWidth,
        height: windowHeight/2
    },
    flipCam:{
        display: "flex", 
        justifyContent:"center",
        alignItems:"center",
        width: 100,
        height: 50,
        borderWidth: 0.5, 
        borderColor: "#000",
        marginBottom: 30,
        marginRight: 40,
        borderRadius: 10
    },
    button:{
        display: "flex", 
        justifyContent:"center",
        alignItems:"center",
        width: 170,
        height: 50,
        borderWidth: 0.5, 
        borderColor: "#000",
        marginBottom: 30,
        borderRadius: 10
    }
})

export default CamScan